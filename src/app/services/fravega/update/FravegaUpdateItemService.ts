import { Inject, Injectable } from '@nestjs/common';
import { IFravegaUpdateItemByIdRepository } from 'src/core/adapters/repositories/fravega/update/Id/IFravegaUpdateItemByIdRepository';
import { IFravegaUpdateAttributesByRefIdRepository } from 'src/core/adapters/repositories/fravega/update/refeId/IFravegaUpdateAttributesByRefIdRepository';
import { IFravegaUpdateItemByRefIdRepository } from 'src/core/adapters/repositories/fravega/update/refeId/IFravegaUpdateItemByRefIdRepository';
import { FravegaUpdateAttributesRequest } from 'src/core/entities/fravega/update/FravegaUpdateAttributesRequest';
import { FravegaUpdateItemRequest } from 'src/core/entities/fravega/update/FravegaUpdateItemRequest';
import { FravegaUpdatedItem } from 'src/core/entities/fravega/update/FravegaUpdatedItem';

@Injectable()
export class FravegaUpdateItemService {
  constructor(
    @Inject('IFravegaUpdateItemByIdRepository')
    private readonly updateByIdRepository: IFravegaUpdateItemByIdRepository,
    @Inject('IFravegaUpdateItemByRefIdRepository')
    private readonly updateByRefIdRepository: IFravegaUpdateItemByRefIdRepository,
    @Inject('IFravegaUpdateAttributesByRefIdRepository')
    private readonly updateAttributesByRefIdRepository: IFravegaUpdateAttributesByRefIdRepository
  ) {}

  async byId(id: string, body: FravegaUpdateItemRequest): Promise<FravegaUpdatedItem> {
    return this.updateByIdRepository.execute(id, body);
  }

  async byRefId(refId: string, body: FravegaUpdateItemRequest): Promise<FravegaUpdatedItem> {
    return this.updateByRefIdRepository.execute(refId, body);
  }

  async attributesByRefId(refId: string, body: FravegaUpdateAttributesRequest): Promise<FravegaUpdatedItem> {
    return this.updateAttributesByRefIdRepository.execute(refId, body);
  }
}
