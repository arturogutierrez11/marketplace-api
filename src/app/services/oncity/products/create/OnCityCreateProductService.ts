import { Injectable, Inject, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreateOnCityProductRequestDto } from 'src/app/controller/oncity/products/create/dto/CreateOnCityProductRequest.dto';
import { IOnCityCreateProductRepository } from 'src/core/adapters/repositories/oncity/products/create/IOnCityCreateProductRepository';

import { OnCityHttpError } from 'src/core/drivers/repositories/oncity/http/errors/OnCityHttpError';
import { OnCityProduct } from 'src/core/entities/oncity/products/create/OnCityProduct';

@Injectable()
export class OnCityCreateProductService {
  constructor(
    @Inject('IOnCityCreateProductRepository')
    private readonly repository: IOnCityCreateProductRepository
  ) {}

  async create(body: CreateOnCityProductRequestDto) {
    try {
      return await this.repository.create(body);
    } catch (error) {
      if (error instanceof OnCityHttpError && error.statusCode === 403) {
        throw new ForbiddenException('La API Key no tiene permisos de Seller Portal');
      }
      throw error;
    }
  }
}
