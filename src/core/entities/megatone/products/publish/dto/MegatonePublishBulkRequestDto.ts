export interface MegatonePublishBulkRequestDto {
  MasivaBulks: MegatonePublishItemDto[];
}

export interface MegatonePublishItemDto {
  IdSeller: number;
  Observacion?: string;
  Titulo: string;
  EAN?: string;
  PrecioLista: number;
  PrecioPromocional?: number;
  LinkYoutube?: string;
  DescripcionAmpliada: string;
  TipoEntrega: number;
  EnvioGratis: boolean;
  EnvioGratisZona: {
    Amba: boolean;
    Interior: boolean;
    Patagonia: boolean;
    EnvioGratis: boolean;
  };
  Dimensiones: {
    Alto: number;
    Ancho: number;
    Profundidad: number;
    Peso: number;
  }[];
  Categoria: number;
  Marca: number;
  SkuSeller: string;
  Stock: number;
  Imagenes: {
    Posicion: number;
    UrlImagen: string;
  }[];
  IdTipoPublicacion: number;
  EnvioPropio: boolean;
  CodigoLegibilidad?: string;
  GarantiaExtActiva: boolean;
  GarantiaFabrica: number;
  IdMoneda: number;
  AlicuotaIva: number;
  AlicuotaImpuestoInterno: number;
}
