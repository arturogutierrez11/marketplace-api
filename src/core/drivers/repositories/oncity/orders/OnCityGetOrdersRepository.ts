import { Injectable, Logger } from '@nestjs/common';
import { OnCityHttpClient } from '../http/OnCityHttpClient';
import { OnCityOrder } from 'src/core/entities/oncity/orders/OnCityOrder';
import { OnCityOrdersResponseDto } from 'src/core/entities/oncity/orders/dto/OnCityOrderResponseDto';
import { OnCityOrderMapper } from 'src/core/entities/oncity/orders/mapper/OnCityOrderMapper';

@Injectable()
export class OnCityGetOrdersRepository {
  private readonly logger = new Logger(OnCityGetOrdersRepository.name);

  constructor(private readonly http: OnCityHttpClient) {}

  async getOrders(params: { fechaDesde: string; fechaHasta: string }): Promise<OnCityOrder[]> {
    try {
      const query = `f_creationDate=creationDate:[${params.fechaDesde} TO ${params.fechaHasta}]`;

      this.logger.debug(`[OnCityOrders] Query: ${query}`);

      const response = await this.http.get<OnCityOrdersResponseDto>(`/api/oms/pvt/orders?${encodeURIComponent(query)}`);

      return (response.list ?? []).map(OnCityOrderMapper.toEntity);
    } catch (error: any) {
      this.logger.warn('[OnCityOrders] Error obteniendo órdenes', {
        params,
        message: error?.message
      });

      return [];
    }
  }
}
