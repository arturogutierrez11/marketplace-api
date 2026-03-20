import { Injectable } from '@nestjs/common';
import { FravegaPublishProductAdapter } from 'src/core/adapters/repositories/fravega/products/publish/IFravegaPublishProductRepository';
import { FravegaHttpClient } from '../../http/FravegaHttpClient';
import { FravegaPublishProduct } from 'src/core/entities/fravega/products/publish/FravegaProductCreate';
import { FravegaConfig } from '../../Config/FravegaConfig';

@Injectable()
export class FravegaPublishProductRepository implements FravegaPublishProductAdapter {
  private readonly http: FravegaHttpClient;

  constructor() {
    const config = new FravegaConfig('publish');
    this.http = new FravegaHttpClient(config);
  }

  async publish(@Body() body: FravegaPublishProductDto, @Res() res: Response) {
    console.log('FRAVEGA /publish body.attributes', body.attributes);

    console.log(
      'FRAVEGA /publish attribute types',
      body.attributes?.map(attr => ({
        name: attr.name,
        value: attr.value,
        type: typeof attr.value
      }))
    );

    const result = await this.service.publish(body);

    return res.status(result.status).send(result.data);
  }
}
