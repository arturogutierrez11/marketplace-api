import { Injectable } from '@nestjs/common';
import { OnCityHttpClient } from '../../http/OnCityHttpClient';
import { IOnCityCreateBrandRepository } from 'src/core/adapters/repositories/oncity/brands/create/IOnCityCreateBrandRepository';
import { OnCityCreateBrandRequestDto } from 'src/core/entities/oncity/brands/create/dto/OnCityCreateBrandRequestDto';
import { OnCityCreateBrandResponseDto } from 'src/core/entities/oncity/brands/create/dto/OnCityCreateBrandResponseDto';

@Injectable()
export class OnCityCreateBrandRepository implements IOnCityCreateBrandRepository {
  constructor(private readonly http: OnCityHttpClient) {}

  async create(payload: OnCityCreateBrandRequestDto): Promise<OnCityCreateBrandResponseDto> {
    return this.http.post('/api/catalog/pvt/brand', payload);
  }
}
