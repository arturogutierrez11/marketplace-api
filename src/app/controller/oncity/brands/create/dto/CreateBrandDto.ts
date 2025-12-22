import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOnCityBrandDto {
  @IsInt()
  @IsOptional()
  Id?: number;

  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsString()
  @IsNotEmpty()
  Text!: string;

  @IsString()
  @IsNotEmpty()
  Keywords!: string;

  @IsString()
  @IsNotEmpty()
  SiteTitle!: string;

  @IsString()
  @IsNotEmpty()
  LinkId!: string;

  @IsBoolean()
  Active!: boolean;

  @IsBoolean()
  MenuHome!: boolean;

  @IsOptional()
  @IsInt()
  Score?: number;
}
