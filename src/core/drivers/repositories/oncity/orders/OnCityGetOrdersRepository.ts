import { Injectable } from '@nestjs/common';
import { IOnCityGetOrdersRepository } from 'src/core/adapters/repositories/oncity/orders/IOnCityGetOrdersRepository';

import { OnCityHttpClient } from '../http/OnCityHttpClient';
import { OnCityOrdersListResponseDto } from 'src/core/entities/oncity/orders/dto/OnCityOrderResponseDto';

@Injectable()
export class OnCityGetOrdersRepository implements IOnCityGetOrdersRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async list(): Promise<OnCityOrdersListResponseDto> {
    return this.http.get<OnCityOrdersListResponseDto>('/api/oms/pvt/orders');
  }
}
