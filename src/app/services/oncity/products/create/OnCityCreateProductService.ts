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

  async create(body: CreateOnCityProductRequestDto): Promise<OnCityProduct> {
    // 🔐 Reglas VTEX (negocio)
    const isType1 = !!body.CategoryPath || !!body.BrandName;
    const isType2 = !!body.CategoryId || !!body.BrandId;

    if (isType1 && isType2) {
      throw new BadRequestException('No se puede mezclar CategoryPath/BrandName con CategoryId/BrandId');
    }

    if (!isType1 && !isType2) {
      throw new BadRequestException('Debe enviar CategoryPath+BrandName o CategoryId+BrandId');
    }

    try {
      return await this.repository.create(body);
    } catch (error) {
      if (error instanceof OnCityHttpError && error.statusCode === 403) {
        throw new ForbiddenException('La API Key no tiene permisos de Product and SKU Management');
      }

      throw error;
    }
  }
}
