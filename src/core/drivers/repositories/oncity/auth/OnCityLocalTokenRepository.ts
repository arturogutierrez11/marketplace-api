import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { IOnCityLocalTokenRepository } from 'src/core/adapters/repositories/oncity/auth/IOnCityLocalTokenRepository';

@Injectable()
export class OnCityLocalTokenRepository implements IOnCityLocalTokenRepository {
  async execute(): Promise<unknown> {
    const appkey = process.env.ONCITY_APP_KEY;
    const apptoken = process.env.ONCITY_APP_TOKEN;
    const an = process.env.ONCITY_ACCOUNT ?? this.getAccountFromAppKey(appkey);

    if (!an) throw new BadRequestException('ONCITY_ACCOUNT is required');
    if (!appkey) throw new BadRequestException('ONCITY_APP_KEY is required');
    if (!apptoken) throw new BadRequestException('ONCITY_APP_TOKEN is required');

    try {
      const response = await axios.post(
        'http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login',
        {
          appkey,
          apptoken
        },
        {
          params: { an },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          timeout: 10000
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status ?? HttpStatus.BAD_GATEWAY;

      throw new HttpException(
        {
          message: 'Error getting OnCity local token',
          accountName: an,
          vtexMessage: err.response?.data ?? err.message
        },
        status
      );
    }
  }

  private getAccountFromAppKey(appkey?: string): string | undefined {
    if (!appkey) return undefined;

    const match = appkey.match(/^vtexappkey-(.+)-[^-]+$/);
    return match?.[1];
  }
}
