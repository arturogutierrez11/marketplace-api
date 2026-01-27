import { Injectable, Inject, ForbiddenException, ConflictException } from '@nestjs/common';
import { UpdateOnCityProductRequestDto } from 'src/app/controller/oncity/products/update-status/dto/UpdateStatusOnCityProductRequestDto';
import { IOnCityUpdateProductRepository } from 'src/core/adapters/repositories/oncity/products/update-status/IOnCityUpdateProductRepository';

import { OnCityHttpError } from 'src/core/drivers/repositories/oncity/http/errors/OnCityHttpError';

@Injectable()
export class OnCityUpdateStatusProductService {
  constructor(
    @Inject('IOnCityUpdateProductRepository')
    private readonly repository: IOnCityUpdateProductRepository
  ) {}

  async update(productId: string, payload: UpdateOnCityProductRequestDto) {
    try {
      return await this.repository.update(productId, {
        ...payload,
        id: productId
      });
    } catch (error) {
      if (error instanceof OnCityHttpError) {
        if (error.statusCode === 403) {
          throw new ForbiddenException('La API Key no tiene permisos para Seller Portal');
        }

        if (error.statusCode === 409) {
          throw new ConflictException(error.response);
        }
      }

      throw error;
    }
  }
}
