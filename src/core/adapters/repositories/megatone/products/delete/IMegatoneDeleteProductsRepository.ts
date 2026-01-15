import { MegatoneResponseDto } from 'src/core/entities/megatone/products/delete/dto/MegatoneResponseDto';
export interface IMegatoneDeleteProductsRepository {
  delete(publicationId: number): Promise<MegatoneResponseDto>;
}
