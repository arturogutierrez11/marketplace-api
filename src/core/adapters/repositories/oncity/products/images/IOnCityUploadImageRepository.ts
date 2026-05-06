export type OnCityUploadImageCommand = {
  sku: string;
  file: {
    buffer: Buffer;
    mimetype?: string;
    originalname?: string;
  };
};

export interface IOnCityUploadImageRepository {
  execute(command: OnCityUploadImageCommand): Promise<unknown>;
}
