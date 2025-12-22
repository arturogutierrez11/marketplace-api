import { OnCityOrderListItemDto } from './OnCityOrderListItemDto';

export interface OnCityOrdersListResponseDto {
  list: OnCityOrderListItemDto[];
  paging: {
    total: number;
    pages: number;
    currentPage: number;
  };
}
