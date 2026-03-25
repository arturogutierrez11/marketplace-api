import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateFravegaAttributesDto {
  @ApiProperty({ description: 'Nombre/codigo del atributo', example: 'COLOR' })
  @IsString()
  a: string;

  @ApiProperty({ description: 'Tipo del atributo', example: 'string' })
  @IsString()
  t: string;

  @ApiProperty({ description: 'Valor del atributo', example: 'Negro' })
  @IsString()
  v: string;
}
