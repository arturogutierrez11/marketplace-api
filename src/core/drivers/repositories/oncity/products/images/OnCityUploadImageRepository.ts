import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IOnCityUploadImageRepository,
  OnCityUploadImageCommand
} from 'src/core/adapters/repositories/oncity/products/images/IOnCityUploadImageRepository';
import { IOnCityLocalTokenRepository } from 'src/core/adapters/repositories/oncity/auth/IOnCityLocalTokenRepository';
import { OnCityHttpError } from '../../http/errors/OnCityHttpError';

@Injectable()
export class OnCityUploadImageRepository implements IOnCityUploadImageRepository {
  constructor(
    @Inject('IOnCityLocalTokenRepository')
    private readonly localTokenRepository: IOnCityLocalTokenRepository
  ) {}

  async execute(command: OnCityUploadImageCommand): Promise<unknown> {
    const account = process.env.ONCITY_ACCOUNT;
    const workspace = process.env.ONCITY_WORKSPACE ?? 'master';

    if (!account) throw new BadRequestException('ONCITY_ACCOUNT is required');

    const loginResponse = await this.localTokenRepository.execute();
    const authCookie = this.extractAuthCookie(loginResponse);

    if (!authCookie) {
      throw new BadRequestException('No se pudo obtener VtexIdclientAutCookie desde el login de VTEX');
    }

    const fileName = this.getFileName(command.sku, command.file);
    const form = new FormData();
    const blob = new Blob([new Uint8Array(command.file.buffer)], {
      type: command.file.mimetype || 'application/octet-stream'
    });

    form.append('', blob, command.file.originalname || fileName);
    const url = `https://app.io.vtex.com/vtex.catalog-images/v0/${account}/${workspace}/images/save/${encodeURIComponent(
      fileName
    )}`;

    try {
      const response = await axios.post(url, form, {
        headers: {
          VtexIdclientAutCookie: authCookie
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 30000
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? null;
        const type = status && status >= 500 ? 'SERVER' : 'UNKNOWN';

        throw new OnCityHttpError(
          status,
          error.response?.data ?? error.message,
          type,
          `[ONCITY IMAGE UPLOAD] ${url} -> ${status ?? 'NO_STATUS'}`
        );
      }

      throw error;
    }
  }

  private extractAuthCookie(loginResponse: unknown): string | null {
    if (typeof loginResponse === 'string') return loginResponse;

    if (!loginResponse || typeof loginResponse !== 'object') return null;

    const response = loginResponse as Record<string, unknown>;
    const candidateKeys = [
      'vtexIdclientAutCookie',
      'VtexIdclientAutCookie',
      'VtexIdClientAutCookie',
      'token',
      'authToken',
      'cookie'
    ];

    for (const key of candidateKeys) {
      const value = response[key];
      if (typeof value === 'string' && value.length > 0) return value;
    }

    return null;
  }

  private getFileName(sku: string, file: OnCityUploadImageCommand['file']): string {
    if (/\.[a-z0-9]+$/i.test(sku)) return sku;

    const originalExtension = file.originalname?.match(/\.[a-z0-9]+$/i)?.[0];
    const mimeExtension = this.getExtensionFromMimeType(file.mimetype);

    return `${sku}${originalExtension ?? mimeExtension ?? '.jpg'}`;
  }

  private getExtensionFromMimeType(mimeType?: string): string | null {
    if (mimeType === 'image/jpeg') return '.jpg';
    if (mimeType === 'image/png') return '.png';
    if (mimeType === 'image/webp') return '.webp';
    if (mimeType === 'image/gif') return '.gif';

    return null;
  }
}
