import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateFravegaItemImageDto {
  @ApiProperty({
    description: 'Tipo de imagen informado por Fravega',
    example: 'url'
  })
  @IsString()
  Type: string;

  @ApiPropertyOptional({
    description: 'Id interno de imagen',
    example: '123'
  })
  @IsOptional()
  @IsString()
  Id?: string;

  @ApiPropertyOptional({
    description: 'URL de la imagen',
    example: 'https://example.com/image.jpg'
  })
  @IsOptional()
  @IsString()
  Url?: string;
}

export class UpdateFravegaItemDimensionsDocDto {
  @ApiProperty({ example: 10 })
  height: number;

  @ApiProperty({ example: 20 })
  length: number;

  @ApiProperty({ example: 2 })
  weight: number;

  @ApiProperty({ example: 15 })
  width: number;
}

export class UpdateFravegaItemFullDocDto {
  @ApiProperty({ example: '7791234567890' })
  ean: string;

  @ApiProperty({ example: 'Argentina' })
  origin: string;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty({ example: 'Heladera No Frost 400L' })
  title: string;

  @ApiPropertyOptional({ example: 'Color inox' })
  subTitle?: string;

  @ApiProperty({ example: '1234' })
  brandId: string;

  @ApiProperty({ example: 'AR' })
  countryId: string;

  @ApiProperty({ example: 'SKU-1234' })
  refId: string;

  @ApiProperty({ example: '5678' })
  primaryCategoryId: string;

  @ApiProperty({ example: 'Descripcion del producto' })
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/video.mp4' })
  video?: string;

  @ApiProperty({ type: UpdateFravegaItemDimensionsDocDto })
  dimensions: UpdateFravegaItemDimensionsDocDto;

  @ApiProperty({
    type: [UpdateFravegaItemImageDto]
  })
  images: UpdateFravegaItemImageDto[];
}

export class UpdateFravegaItemDto {
  @ApiProperty({
    type: [UpdateFravegaItemImageDto],
    description: 'Unico campo permitido para update parcial actual'
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => UpdateFravegaItemImageDto)
  images: UpdateFravegaItemImageDto[];
}
