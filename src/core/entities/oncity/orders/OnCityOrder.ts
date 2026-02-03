export interface OnCityOrderProduct {
  SellerSku?: string | null;
  Cantidad: number | null;
  PrecioUnitario: number | null;
  Subtotal: number | null;
  ImagenPrincipal?: string | null;
}

export interface OnCityOrder {
  IdOrden: number | null;
  Fecha: string | null;
  MontoVenta: number | null;

  Cliente: {
    Nombre: string | null;
    Apellido: string | null;
  };

  Estado: {
    IdEstado: number | null;
    Descripcion: string | null;
    Fecha: string | null;
  }[];

  Productos: OnCityOrderProduct[];
}
