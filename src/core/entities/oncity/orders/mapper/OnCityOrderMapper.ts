import { OnCityOrderListItemDto } from '../dto/OnCityOrderListItemDto';
import { MarketplaceOrder } from '../OnCityOrder';

export class OnCityOrderListMapper {
  static toEntity(dto: OnCityOrderListItemDto): MarketplaceOrder {
    return {
      orderId: dto.orderId,
      createdAt: dto.creationDate,
      clientName: dto.clientName?.trim(),
      total: dto.totalValue,
      status: dto.status,
      statusDescription: dto.statusDescription,
      salesChannel: dto.salesChannel,
      affiliateId: dto.affiliateId,
      sequence: dto.sequence
    };
  }
}
