import { IsString, IsArray, IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/* --------------------------------- Images -------------------------------- */

class OnCityProductImageDto {
  @IsString()
  id: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  alt?: string;
}

/* -------------------------------- Dimensions ----------------------------- */

class OnCitySkuDimensionsDto {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  length: number;
}

/* ---------------------------------- SKU ---------------------------------- */

class OnCitySkuDto {
  @IsString()
  id: string;

  @IsString()
  externalId: string;

  @IsString()
  name: string;

  @IsString()
  ean: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  weight: number;

  @ValidateNested()
  @Type(() => OnCitySkuDimensionsDto)
  dimensions: OnCitySkuDimensionsDto;

  @IsArray()
  specs: any[];

  @IsArray()
  images: string[];
}

/* -------------------------------- PRODUCT -------------------------------- */

export class UpdateOnCityProductRequestDto {
  @IsString()
  id: string;

  @IsString()
  externalId: string;

  @IsString()
  status: 'active' | 'inactive';

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  brandId: string;

  @IsArray()
  categoryIds: string[];

  @IsArray()
  specs: any[];

  @IsArray()
  attributes: any[];

  @IsString()
  slug: string;

  @ValidateNested({ each: true })
  @Type(() => OnCityProductImageDto)
  images: OnCityProductImageDto[];

  @ValidateNested({ each: true })
  @Type(() => OnCitySkuDto)
  skus: OnCitySkuDto[];

  @IsString()
  origin: string;
}
