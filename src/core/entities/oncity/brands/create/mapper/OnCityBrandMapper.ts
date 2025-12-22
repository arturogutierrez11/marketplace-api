import { OnCityCreateBrandResponseDto } from '../dto/OnCityCreateBrandResponseDto';
import { OnCityBrand } from '../OnCityBrand';

export class OnCityBrandMapper {
  static toEntity(dto: OnCityCreateBrandResponseDto): OnCityBrand {
    return {
      id: dto.Id,
      name: dto.Name,
      active: dto.Active,
      linkId: dto.LinkId
    };
  }
}
