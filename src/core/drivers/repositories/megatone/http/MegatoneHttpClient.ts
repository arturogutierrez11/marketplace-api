import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { MegatoneAuthRepository } from '../auth/MegatoneAuthRepository';

@Injectable()
export class MegatoneHttpClient {
  private readonly client: AxiosInstance;

  constructor(private readonly authRepository: MegatoneAuthRepository) {
    this.client = axios.create({
      baseURL: process.env.MEGATONE_API_BASE_URL,
      timeout: 30000
    });
  }

  private async withAuth(config: AxiosRequestConfig = {}): Promise<AxiosRequestConfig> {
    const token = await this.authRepository.getAccessToken();

    return {
      ...config,
      headers: {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }

  async post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const finalConfig = await this.withAuth(config);
      const response = await this.client.post<T>(url, body, finalConfig);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 400 && data) {
        return data as T;
      }

      if (error?.response) {
        throw new Error(`[MEGATONE POST] ${url} → ${status} ${JSON.stringify(data)}`);
      }

      if (error?.request) {
        throw new Error(`[MEGATONE POST] ${url} → No response from server`);
      }

      throw new Error(`[MEGATONE POST] ${url} → ${error?.message ?? error}`);
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const finalConfig = await this.withAuth(config);
      const response = await this.client.get<T>(url, finalConfig);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (error?.response) {
        throw new Error(`[MEGATONE GET] ${url} → ${status} ${JSON.stringify(data)}`);
      }

      if (error?.request) {
        throw new Error(`[MEGATONE GET] ${url} → No response from server`);
      }

      throw new Error(`[MEGATONE GET] ${url} → ${error?.message ?? error}`);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const finalConfig = await this.withAuth(config);
      const response = await this.client.delete<T>(url, finalConfig);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 400 && data) {
        return data as T;
      }
      if (error?.response) {
        throw new Error(`[MEGATONE DELETE] ${url} → ${status} ${JSON.stringify(data)}`);
      }

      if (error?.request) {
        throw new Error(`[MEGATONE DELETE] ${url} → No response from server`);
      }

      throw new Error(`[MEGATONE DELETE] ${url} → ${error?.message ?? error}`);
    }
  }

  async update<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const finalConfig = await this.withAuth(config);
      const response = await this.client.post<T>(url, body, finalConfig);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 400 && data) {
        return data as T;
      }

      if (error?.response) {
        throw new Error(`[MEGATONE UPDATE] ${url} → ${status} ${JSON.stringify(data)}`);
      }

      if (error?.request) {
        throw new Error(`[MEGATONE UPDATE] ${url} → No response from server`);
      }

      throw new Error(`[MEGATONE UPDATE] ${url} → ${error?.message ?? error}`);
    }
  }
  async put<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const finalConfig = await this.withAuth(config);
      const response = await this.client.put<T>(url, body, finalConfig);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 400 && data) {
        return data as T;
      }

      if (error?.response) {
        throw new Error(`[MEGATONE PUT] ${url} → ${status} ${JSON.stringify(data)}`);
      }

      if (error?.request) {
        throw new Error(`[MEGATONE PUT] ${url} → No response from server`);
      }

      throw new Error(`[MEGATONE PUT] ${url} → ${error?.message ?? error}`);
    }
  }
}
