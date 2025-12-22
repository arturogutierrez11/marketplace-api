import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { IOnCityCreateBrandRepository } from 'src/core/adapters/repositories/oncity/brands/create/IOnCityCreateBrandRepository';
import { OnCityCreateBrandRequestDto } from 'src/core/entities/oncity/brands/create/dto/OnCityCreateBrandRequestDto';
import { OnCityBrand } from 'src/core/entities/oncity/brands/create/OnCityBrand';
import { OnCityHttpError } from 'src/core/drivers/repositories/oncity/http/errors/OnCityHttpError';
import { OnCityBrandMapper } from 'src/core/entities/oncity/brands/create/mapper/OnCityBrandMapper';

@Injectable()
export class OnCityCreateBrandService {
  constructor(
    @Inject('IOnCityCreateBrandRepository')
    private readonly repository: IOnCityCreateBrandRepository
  ) {}

  async create(payload: OnCityCreateBrandRequestDto): Promise<OnCityBrand> {
    try {
      const responseDto = await this.repository.create(payload);

      return OnCityBrandMapper.toEntity(responseDto);
    } catch (error) {
      if (error instanceof OnCityHttpError && error.statusCode === 403) {
        throw new ForbiddenException('La API Key de VTEX no tiene permisos para crear marcas (Brands Management)');
      }

      throw error;
    }
  }
}
