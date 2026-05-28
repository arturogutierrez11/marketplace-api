import { Injectable } from '@nestjs/common';
import { IFravegaGetProductsRepository } from 'src/core/adapters/repositories/fravega/products/get/IFravegaGetProductsRepository';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { FravegaProduct } from 'src/core/entities/fravega/products/get/FravegaProduct';
import { FravegaHttpClient } from '../../http/FravegaHttpClient';
import {
  FravegaProductsApiResponse,
  FravegaProductsPage
} from 'src/core/entities/fravega/products/get/FravegaProductsApiResponse';

@Injectable()
export class FravegaGetProductsRepository implements IFravegaGetProductsRepository {
  constructor(private readonly http: FravegaHttpClient) {}

  async list(pagination: PaginationParams): Promise<FravegaProductsPage> {
    const response = await this.fetchPage(pagination);
    return this.toPage(response, pagination);
  }

  private async fetchPage(pagination: PaginationParams): Promise<FravegaProductsApiResponse> {
    return this.http.get<FravegaProductsApiResponse>('/api/v1/item', {
      params: {
        offset: pagination.offset,
        limit: pagination.limit
      }
    });
  }

  private extractItems(response: FravegaProductsApiResponse): FravegaProduct[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response.items)) return response.items;
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.results)) return response.results;

    return [];
  }

  private toPage(response: FravegaProductsApiResponse, pagination: PaginationParams): FravegaProductsPage {
    const data = this.extractItems(response);

    return {
      total: this.extractNumber(response, ['total', 'count', 'totalCount']) ?? data.length,
      page: this.extractNumber(response, ['page', 'offset']) ?? pagination.offset,
      size: this.extractNumber(response, ['size', 'limit', 'pageSize']) ?? data.length,
      data
    };
  }

  private extractNumber(
    response: FravegaProductsApiResponse,
    keys: Array<'size' | 'total' | 'count' | 'totalCount' | 'limit' | 'pageSize' | 'page' | 'offset'>
  ): number | null {
    if (Array.isArray(response)) return null;

    for (const key of keys) {
      const value = response[key];
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
    }

    return null;
  }
}
