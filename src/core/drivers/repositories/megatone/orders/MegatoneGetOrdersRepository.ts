import { Injectable, Logger } from '@nestjs/common';
import { MegatoneHttpClient } from '../http/MegatoneHttpClient';
import { MegatoneOrdersResponseDto } from 'src/core/entities/megatone/orders/dto/MegatoneOrdersResponseDto';
import { IMegatoneGetOrdersRepository } from 'src/core/adapters/repositories/megatone/ordres/IMegatoneGetOrdersRepository';
import { MegatoneOrder } from 'src/core/entities/megatone/orders/MegatoneOrder';

@Injectable()
export class MegatoneGetOrdersRepository implements IMegatoneGetOrdersRepository {
  private readonly logger = new Logger(MegatoneGetOrdersRepository.name);

  constructor(private readonly httpClient: MegatoneHttpClient) {}

  async getOrders(params: { fechaDesde: string; fechaHasta: string }): Promise<MegatoneOrder[]> {
    try {
      const response = await this.httpClient.get<MegatoneOrdersResponseDto>('/Marketplace/Ordenes', {
        params: {
          fechaDesde: params.fechaDesde.slice(0, 10),
          fechaHasta: params.fechaHasta.slice(0, 10)
        }
      });

      return response.Elementos ?? [];
    } catch (error: any) {
      this.logger.warn('[MegatoneOrders] Error obteniendo órdenes', {
        fechaDesde: params.fechaDesde,
        fechaHasta: params.fechaHasta,
        message: error?.message
      });

      return [];
    }
  }
}
