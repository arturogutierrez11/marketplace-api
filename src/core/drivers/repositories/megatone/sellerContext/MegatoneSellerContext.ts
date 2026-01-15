export class MegatoneSellerContext {
  static getSellerId(): number {
    const sellerId = process.env.MEGATONE_SELLER_ID;

    if (!sellerId) {
      throw new Error('MEGATONE_SELLER_ID is not defined');
    }

    const parsed = Number(sellerId);
    if (Number.isNaN(parsed)) {
      throw new Error('MEGATONE_SELLER_ID must be a number');
    }

    return parsed;
  }
}
