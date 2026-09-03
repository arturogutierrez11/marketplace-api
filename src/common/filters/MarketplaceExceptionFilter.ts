import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { OnCityHttpError } from '../../core/drivers/repositories/oncity/http/errors/OnCityHttpError';
import { FravegaHttpError } from '../../core/drivers/repositories/fravega/http/error/FravegaHttpError';
import { Logger } from '../../core/drivers/logger/Logger';

type MarketplaceErrorType = 'TIMEOUT' | 'RATE_LIMIT' | 'SERVER' | 'UNKNOWN';

interface NormalizedError {
  marketplace: string;
  status: number;
  errorType: MarketplaceErrorType;
  upstreamStatus: number | null;
  upstreamResponse: unknown;
  message: string;
}

/**
 * Traduce los errores de los marketplaces a la respuesta HTTP real, preservando
 * el status y el body que devolvió el upstream. Sin esto, un 400 de VTEX/Fravega
 * salía como "500 Internal server error" y el motivo se perdía.
 */
@Catch()
export class MarketplaceExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    /* Las HttpException de Nest (validación, 404, las que lanzan los services) ya
       llevan el status correcto: se respetan tal cual. */
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();

      if (status >= 500) {
        Logger.error(`[HTTP ${status}] ${request.method} ${request.url} → ${JSON.stringify(body)}`);
      }

      response.status(status).json(body);
      return;
    }

    const normalized = this.normalize(exception);

    if (!normalized) {
      const message = exception instanceof Error ? exception.message : String(exception);
      Logger.error(`[UNHANDLED] ${request.method} ${request.url} → ${message}`);

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        path: request.url,
        message
      });
      return;
    }

    Logger.error(
      `[${normalized.marketplace} ${normalized.errorType}] ${request.method} ${request.url} → ` +
        `${normalized.upstreamStatus ?? 'NO_STATUS'} ${JSON.stringify(normalized.upstreamResponse)}`
    );

    response.status(normalized.status).json({
      statusCode: normalized.status,
      path: request.url,
      marketplace: normalized.marketplace,
      errorType: normalized.errorType,
      message: normalized.message,
      upstreamStatus: normalized.upstreamStatus,
      upstreamResponse: normalized.upstreamResponse
    });
  }

  private normalize(exception: unknown): NormalizedError | null {
    if (exception instanceof OnCityHttpError) {
      return {
        marketplace: 'ONCITY',
        status: this.resolveStatus(exception.statusCode, exception.errorType),
        errorType: exception.errorType,
        upstreamStatus: exception.statusCode,
        upstreamResponse: this.unwrap(exception.response),
        message: exception.message
      };
    }

    if (exception instanceof FravegaHttpError) {
      return {
        marketplace: 'FRAVEGA',
        status: this.resolveStatus(exception.status, exception.type),
        errorType: exception.type,
        upstreamStatus: exception.status,
        upstreamResponse: this.unwrap(exception.data),
        message: exception.message
      };
    }

    return null;
  }

  /**
   * Si el upstream respondió con un status propio (400, 404, 422…) se propaga.
   * Si no hubo respuesta, se deriva del tipo de fallo.
   */
  private resolveStatus(upstreamStatus: number | null, errorType: MarketplaceErrorType): number {
    if (upstreamStatus && upstreamStatus >= 400 && upstreamStatus < 500) {
      return upstreamStatus;
    }

    if (errorType === 'TIMEOUT') return HttpStatus.GATEWAY_TIMEOUT;
    if (errorType === 'RATE_LIMIT') return HttpStatus.TOO_MANY_REQUESTS;

    return HttpStatus.BAD_GATEWAY;
  }

  /**
   * Algunos repositorios envuelven un OnCityHttpError dentro de otro
   * (new OnCityHttpError(500, error, '…')). Se desanida para no ocultar el body real.
   */
  private unwrap(response: unknown): unknown {
    if (response instanceof OnCityHttpError) return this.unwrap(response.response);
    if (response instanceof FravegaHttpError) return this.unwrap(response.data);
    if (response instanceof Error) return response.message;

    return response;
  }
}
