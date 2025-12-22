import { OnCityBrandResponseDto } from '../dto/OnCityBrandResponseDto';
import { OnCityBrand } from '../OnCityBrand';

export class OnCityBrandMapper {
  static toEntity(dto: OnCityBrandResponseDto): OnCityBrand {
    return {
      id: dto.id,
      name: dto.name,
      active: dto.isActive
    };
  }
}
