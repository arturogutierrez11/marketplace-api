import { Inject, Injectable } from '@nestjs/common';
import { IFravegaGetProductsRepository } from 'src/core/adapters/repositories/fravega/products/get/IFravegaGetProductsRepository';
import { PaginationParams } from 'src/core/entities/common/Pagination';
import { FravegaProductsPage } from 'src/core/entities/fravega/products/get/FravegaProductsApiResponse';

@Injectable()
export class GetFravegaProductsService {
  constructor(
    @Inject('IFravegaGetProductsRepository')
    private readonly productsRepository: IFravegaGetProductsRepository
  ) {}

  async list(pagination: PaginationParams): Promise<FravegaProductsPage> {
    return this.productsRepository.list(pagination);
  }
}
