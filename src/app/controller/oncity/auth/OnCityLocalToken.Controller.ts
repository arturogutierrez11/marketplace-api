import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OnCityLocalTokenService } from 'src/app/services/oncity/auth/OnCityLocalTokenService';

@ApiTags('oncity')
@Controller('oncity/auth')
export class OnCityLocalTokenController {
  constructor(private readonly localTokenService: OnCityLocalTokenService) {}

  @Post('local-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener token local de VTEX para OnCity',
    description:
      'Solicita a VTEX el VtexIdclientAutCookie usando ONCITY_ACCOUNT, ONCITY_APP_KEY y ONCITY_APP_TOKEN desde .env.'
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta cruda de VTEX con el token/cookie local.'
  })
  async getLocalToken(): Promise<unknown> {
    return this.localTokenService.execute();
  }
}
