export interface MegatoneOrderProduct {
  SellerSku?: string;
  Cantidad: number;
  PrecioUnitario: number;
  Subtotal: number;
  ImagenPrincipal?: string;
}

export interface MegatoneOrder {
  IdOrden: number;
  Fecha: string;
  MontoVenta: number;

  Cliente: {
    Nombre: string;
    Apellido: string;
  };

  Estado: {
    IdEstado: number;
    Descripcion: string;
    Fecha: string;
  }[];

  Productos: MegatoneOrderProduct[];
}
