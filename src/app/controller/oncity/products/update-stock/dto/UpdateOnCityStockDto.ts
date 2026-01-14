import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateOnCityStockDto {
  @ApiProperty({
    description: 'SKU ID interno de VTEX',
    example: 2166
  })
  @IsInt()
  @IsNotEmpty()
  skuId: number;

  @ApiProperty({
    description: 'Cantidad de stock a setear (0 permite dejar sin stock)',
    example: 14,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  quantity: number;
}
