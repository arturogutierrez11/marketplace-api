import { FravegaUpdateAttributesRequest } from 'src/core/entities/fravega/update/FravegaUpdateAttributesRequest';
import { FravegaUpdatedItem } from 'src/core/entities/fravega/update/FravegaUpdatedItem';

export interface IFravegaUpdateAttributesByRefIdRepository {
  execute(refId: string, body: FravegaUpdateAttributesRequest): Promise<FravegaUpdatedItem>;
}
