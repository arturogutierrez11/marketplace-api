import { OnCityCreateProductResponseDto } from '../dto/OnCityCreateProductResponseDto';
import { OnCityProduct } from '../OnCityProduct';

export class OnCityProductMapper {
  static toEntity(dto: OnCityCreateProductResponseDto): OnCityProduct {
    return {
      id: dto.Id,
      name: dto.Name,
      categoryId: dto.CategoryId,
      brandId: dto.BrandId,
      linkId: dto.LinkId,
      active: dto.IsActive,
      visible: dto.IsVisible
    };
  }
}
