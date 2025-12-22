import { OnCityBrandResponseDto } from './OnCityBrandResponseDto';

export interface OnCityBrandPagedResponseDto {
  items: OnCityBrandResponseDto[];
  paging: {
    page: number;
    perPage: number;
    total: number;
    pages: number;
  };
}
