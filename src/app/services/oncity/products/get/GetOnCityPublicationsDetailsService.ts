import { Injectable } from '@nestjs/common';
import { GetOnCityPublicationsDetails } from 'src/core/interactor/oncity/GetOnCityPublicationsDetails';

@Injectable()
export class GetOnCityPublicationsDetailsService {
  constructor(private readonly getPublicationsInteractor: GetOnCityPublicationsDetails) {}

  async getPublications(params: { offset: number; limit: number }) {
    return this.getPublicationsInteractor.execute(params);
  }
}
