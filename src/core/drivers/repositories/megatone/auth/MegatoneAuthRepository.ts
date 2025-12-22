import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import { IMegatoneAuthRepository } from '../../../../adapters/repositories/megatone/auth/IMegatoneAuthRepository';
import { ICacheManager } from 'src/core/adapters/cache/ICacheManager';

interface MegatoneTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

@Injectable()
export class MegatoneAuthRepository implements IMegatoneAuthRepository {
  private readonly CACHE_KEY = 'MEGATONE_ACCESS_TOKEN';

  constructor(
    @Inject('ICacheManager')
    private readonly cacheManager: ICacheManager
  ) {}

  async getAccessToken(): Promise<string> {
    const cachedToken = await this.cacheManager.get(this.CACHE_KEY);
    if (cachedToken) return cachedToken;

    const response = await axios.post<MegatoneTokenResponse>(
      process.env.MEGATONE_AUTH_URL!,
      new URLSearchParams({
        client_id: process.env.MEGATONE_CLIENT_ID!,
        client_secret: process.env.MEGATONE_CLIENT_SECRET!,
        grant_type: 'client_credentials',
        scope: process.env.MEGATONE_SCOPE!
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token, expires_in } = response.data;

    // cacheamos con margen de seguridad (5 min)
    const ttlMs = (expires_in - 300) * 1000;

    await this.cacheManager.save(this.CACHE_KEY, access_token, ttlMs);

    return access_token;
  }
}
