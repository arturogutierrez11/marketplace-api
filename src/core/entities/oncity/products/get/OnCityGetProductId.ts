export interface OnCityGetProductId {
  data: Record<string, number[]>;

  range: {
    total: number;
    from: number;
    to: number;
  };
}
