export interface MegatoneProductDto {
  IdPublicacion: number;
  IdSeller: number;
  FechaPublicacion: string;
  FechaUltimaModificacion: string;

  Titulo: string;
  SkuSeller: string;
  SkuMarket: string;

  PrecioLista: number;
  PrecioPromocional: number;
  PrecioNeto: number;

  Stock: number;
  Estado: string;

  EnvioGratis: boolean;

  LinkPublicacion?: string;

  Categoria?: {
    Codigo: number;
    Descripcion: string;
  };

  Marca?: {
    Codigo: number;
    Descripcion: string;
  };

  Imagenes?: {
    IdImagen: string;
    Posicion: number;
    UrlImagen: string;
  }[];
}
