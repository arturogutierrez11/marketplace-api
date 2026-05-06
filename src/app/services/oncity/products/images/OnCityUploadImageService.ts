import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IOnCityUploadImageRepository } from 'src/core/adapters/repositories/oncity/products/images/IOnCityUploadImageRepository';

type UploadImageCommand = {
  sku: string;
  file?: {
    buffer: Buffer;
    mimetype?: string;
    originalname?: string;
  };
};

@Injectable()
export class OnCityUploadImageService {
  constructor(
    @Inject('IOnCityUploadImageRepository')
    private readonly uploadImageRepository: IOnCityUploadImageRepository
  ) {}

  async execute(command: UploadImageCommand): Promise<unknown> {
    if (!command.file?.buffer) {
      throw new BadRequestException('Debe enviar un archivo en el campo multipart "file"');
    }

    return this.uploadImageRepository.execute({
      sku: command.sku,
      file: command.file
    });
  }
}
