import { Injectable } from '@nestjs/common';
import { IFravegaUpdateAttributesByRefIdRepository } from 'src/core/adapters/repositories/fravega/update/refeId/IFravegaUpdateAttributesByRefIdRepository';
import { FravegaHttpClient } from '../../http/FravegaHttpClient';
import { FravegaUpdateAttributesRequest } from 'src/core/entities/fravega/update/FravegaUpdateAttributesRequest';
import { FravegaUpdatedItem } from 'src/core/entities/fravega/update/FravegaUpdatedItem';

@Injectable()
export class FravegaUpdateAttributesByRefIdRepository implements IFravegaUpdateAttributesByRefIdRepository {
  constructor(private readonly http: FravegaHttpClient) {}

  async execute(refId: string, body: FravegaUpdateAttributesRequest): Promise<FravegaUpdatedItem> {
    return this.http.put(`/api/v1/item/refId/${encodeURIComponent(refId)}/attributes`, body);
  }
}
