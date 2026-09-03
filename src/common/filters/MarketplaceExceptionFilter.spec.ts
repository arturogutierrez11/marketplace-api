import { MarketplaceExceptionFilter } from './MarketplaceExceptionFilter';
import { OnCityHttpError } from '../../core/drivers/repositories/oncity/http/errors/OnCityHttpError';
import { FravegaHttpError } from '../../core/drivers/repositories/fravega/http/error/FravegaHttpError';
import { ArgumentsHost, BadRequestException } from '@nestjs/common';

interface FilterResult {
  status: number;
  body: Record<string, unknown>;
}

function run(exception: unknown): FilterResult {
  const json = jest.fn<void, [Record<string, unknown>]>();
  const status = jest.fn<{ json: typeof json }, [number]>().mockReturnValue({ json });

  const host = {
    switchToHttp: () => ({
      getResponse: () => ({ status }),
      getRequest: () => ({ method: 'PUT', url: '/oncity/products/389' })
    })
  } as unknown as ArgumentsHost;

  new MarketplaceExceptionFilter().catch(exception, host);

  return { status: status.mock.calls[0][0], body: json.mock.calls[0][0] };
}

it('propaga el 400 y el body real de VTEX', () => {
  const vtexBody = { error: { code: 'PRD001', message: 'Product not found' } };
  const r = run(new OnCityHttpError(400, vtexBody, 'UNKNOWN', '[ONCITY PUT] /products/389 → 400'));
  expect(r.status).toBe(400);
  expect(r.body.upstreamResponse).toEqual(vtexBody);
  expect(r.body.marketplace).toBe('ONCITY');
});

it('desanida el error envuelto dos veces', () => {
  const inner = new OnCityHttpError(422, { msg: 'ean invalido' }, 'UNKNOWN', 'inner');
  const r = run(new OnCityHttpError(500, inner, 'Error updating price in OnCity'));
  expect(r.body.upstreamResponse).toEqual({ msg: 'ean invalido' });
});

it('mapea TIMEOUT a 504 y RATE_LIMIT a 429', () => {
  expect(run(new OnCityHttpError(null, null, 'TIMEOUT', 't')).status).toBe(504);
  expect(run(new FravegaHttpError(429, null, 'RATE_LIMIT', 'r')).status).toBe(429);
});

it('respeta las HttpException de Nest', () => {
  const r = run(new BadRequestException('skuId must be a number'));
  expect(r.status).toBe(400);
});
