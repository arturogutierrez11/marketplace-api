export interface MarketplaceProduct {
  publicationId: number;
  sellerSku: string;
  marketSku: string;
  title: string;
  price: number;
  promoPrice?: number;
  stock: number;
  status: string;
  category?: string;
  brand?: string;
  images: string[];
  LinkPublicacion: string;
}
