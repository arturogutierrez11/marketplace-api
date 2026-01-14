import { Injectable } from '@nestjs/common';
import { OnCityUpdateStock } from 'src/core/entities/oncity/products/update-stock/OnCityUpdateStock';
import { OnCityHttpClient } from '../http/OnCityHttpClient';
import { OnCityHttpError } from '../http/errors/OnCityHttpError';
import { OnCityUpdateStockResponseDto } from 'src/core/entities/oncity/products/update-stock/dto/OnCityUpdateStockResponseDto';
import { OnCityUpdateStockRequestDto } from 'src/core/entities/oncity/products/update-stock/dto/OnCityUpdateStockRequestDto';

@Injectable()
export class OnCityUpdateStockRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async execute(data: OnCityUpdateStock): Promise<OnCityUpdateStockResponseDto> {
    const body: OnCityUpdateStockRequestDto = {
      quantity: data.quantity
    };

    const url = `https://${process.env.ONCITY_ACCOUNT}.myvtex.com/api/logistics/pvt/inventory/skus/${data.skuId}/warehouses/1_1`;

    try {
      return await this.httpClient.put<OnCityUpdateStockResponseDto>(url, body);
    } catch (error) {
      throw new OnCityHttpError(500, error, 'Error updating stock in OnCity');
    }
  }
}
