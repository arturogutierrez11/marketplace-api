import { Inject, Injectable } from '@nestjs/common';
import { IOnCityLocalTokenRepository } from 'src/core/adapters/repositories/oncity/auth/IOnCityLocalTokenRepository';

@Injectable()
export class OnCityLocalTokenService {
  constructor(
    @Inject('IOnCityLocalTokenRepository')
    private readonly localTokenRepository: IOnCityLocalTokenRepository
  ) {}

  async execute(): Promise<unknown> {
    return this.localTokenRepository.execute();
  }
}
