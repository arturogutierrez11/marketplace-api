import { OnCityCreateBrandRequestDto } from 'src/core/entities/oncity/brands/create/dto/OnCityCreateBrandRequestDto';
import { OnCityCreateBrandResponseDto } from 'src/core/entities/oncity/brands/create/dto/OnCityCreateBrandResponseDto';

export interface IOnCityCreateBrandRepository {
  create(payload: OnCityCreateBrandRequestDto): Promise<OnCityCreateBrandResponseDto>;
}
