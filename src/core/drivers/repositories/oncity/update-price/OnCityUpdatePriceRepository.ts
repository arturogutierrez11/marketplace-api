import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../http/OnCityHttpClient';
import { OnCityHttpError } from '../http/errors/OnCityHttpError';
import { OnCityUpdatePrice } from 'src/core/entities/oncity/products/update-price/OnCityUpdatePrice';
import { OnCityUpdatePriceRequestDto } from 'src/core/entities/oncity/products/update-price/dto/OnCityUpdatePriceRequestDto';
import { OnCityUpdatePriceResponseDto } from 'src/core/entities/oncity/products/update-price/dto/OnCityUpdatePriceResponseDto';

@Injectable()
export class OnCityUpdatePriceRepository {
  constructor(private readonly httpClient: OnCityHttpClient) {}

  async execute(data: OnCityUpdatePrice): Promise<OnCityUpdatePriceResponseDto> {
    const body: OnCityUpdatePriceRequestDto = {
      listPrice: data.listPrice,
      costPrice: data.costPrice,
      markup: data.markup
    };

    const url = `https://${process.env.ONCITY_ACCOUNT}.myvtex.com/api/pricing/prices/${data.skuId}`;

    try {
      await this.httpClient.put(url, body);
      return;
    } catch (error) {
      throw new OnCityHttpError(500, error, 'Error updating price in OnCity');
    }
  }
}
