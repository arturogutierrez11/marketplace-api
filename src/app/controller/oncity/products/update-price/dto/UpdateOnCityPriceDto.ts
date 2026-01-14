import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateOnCityPriceDto {
  @ApiProperty({ example: 2166 })
  @IsInt()
  skuId: number;

  @ApiProperty({ example: 946999 })
  @IsInt()
  @Min(0)
  listPrice: number;

  @ApiProperty({ example: 918501 })
  @IsInt()
  @Min(0)
  costPrice: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  markup: number;
}
