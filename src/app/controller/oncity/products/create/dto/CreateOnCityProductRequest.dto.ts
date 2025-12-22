import { IsString, IsNumber, IsOptional, IsBoolean, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class CreateOnCityProductRequestDto {
  @IsOptional()
  @IsNumber()
  Id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  Name: string;

  // 👉 Type 1
  @IsOptional()
  @IsString()
  CategoryPath?: string;

  @IsOptional()
  @IsString()
  BrandName?: string;

  // 👉 Type 2
  @IsOptional()
  @IsNumber()
  CategoryId?: number;

  @IsOptional()
  @IsNumber()
  BrandId?: number;

  @IsOptional()
  @IsNumber()
  DepartmentId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  RefId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  Title?: string;

  @IsOptional()
  @IsString()
  LinkId?: string;

  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsDateString()
  ReleaseDate?: string;

  @IsOptional()
  @IsBoolean()
  IsVisible?: boolean;

  @IsOptional()
  @IsBoolean()
  IsActive?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  TaxCode?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  MetaTagDescription?: string;

  @IsOptional()
  @IsBoolean()
  ShowWithoutStock?: boolean;

  @IsOptional()
  @IsNumber()
  Score?: number;
}
