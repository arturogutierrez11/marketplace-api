import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { OnCityHttpError } from './errors/OnCityHttpError';

@Injectable()
export class OnCityHttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    const account = process.env.ONCITY_ACCOUNT;
    const appKey = process.env.ONCITY_APP_KEY;
    const appToken = process.env.ONCITY_APP_TOKEN;

    if (!account) throw new Error('ONCITY_ACCOUNT is not defined');
    if (!appKey) throw new Error('ONCITY_APP_KEY is not defined');
    if (!appToken) throw new Error('ONCITY_APP_TOKEN is not defined');

    this.client = axios.create({
      baseURL: `https://${account}.vtexcommercestable.com.br`,
      timeout: 30000,
      headers: {
        'X-VTEX-API-AppKey': appKey,
        'X-VTEX-API-AppToken': appToken,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        throw new Error(`[ONCITY GET] ${url} → ${err.response.status} ${JSON.stringify(err.response.data)}`);
      }

      throw new Error(`[ONCITY GET] ${url} → ${err.message}`);
    }
  }

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, body);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        throw new OnCityHttpError(err.response.status, err.response.data, `[ONCITY POST] ${url}`);
      }

      throw new Error(`[ONCITY POST] ${url} → ${err.message}`);
    }
  }
}
