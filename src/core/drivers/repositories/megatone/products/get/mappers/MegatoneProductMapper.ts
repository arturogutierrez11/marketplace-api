import { MegatoneProductDto } from 'src/core/entities/megatone/products/get/dto/MegatoneProductDto';
import { MarketplaceProduct } from 'src/core/entities/megatone/products/get/MarketplaceProduct';

export class MegatoneProductMapper {
  static toEntity(item: MegatoneProductDto): MarketplaceProduct {
    return {
      publicationId: item.IdPublicacion,
      sellerSku: item.SkuSeller,
      marketSku: item.SkuMarket,
      title: item.Titulo,
      price: item.PrecioLista,
      stock: item.Stock,
      status: item.Estado,
      images: (item.Imagenes ?? []).map(img => img.UrlImagen)
    };
  }
}
