import { MegatoneProductsRepository } from './MegatoneProductsRepository';
import { MegatoneProductDto } from 'src/core/entities/megatone/products/get/dto/MegatoneProductDto';

describe('MegatoneProductsRepository', () => {
  beforeEach(() => {
    process.env.MEGATONE_SELLER_ID = '389';
  });

  const makeProduct = (id: number): MegatoneProductDto =>
    ({
      IdPublicacion: id,
      SkuSeller: `SKU-${id}`
    }) as MegatoneProductDto;

  const makeResponse = (startId: number) => ({
    Page: 1,
    PageSize: 10,
    Total: 100,
    TotalPages: 10,
    Content: Array.from({ length: 10 }, (_, index) => makeProduct(startId + index))
  });

  const createRepository = () => {
    const http = {
      get: jest.fn(async (_url: string, config: { params: { Pagina: number } }) => {
        const pages: Record<number, ReturnType<typeof makeResponse>> = {
          1: makeResponse(1),
          3: makeResponse(11),
          4: makeResponse(21),
          6: makeResponse(31),
          7: makeResponse(41),
          9: makeResponse(51),
          10: makeResponse(61),
          12: makeResponse(71),
          14: makeResponse(81)
        };

        return pages[config.params.Pagina] ?? {
          Page: config.params.Pagina,
          PageSize: 10,
          Total: 0,
          TotalPages: 0,
          Content: []
        };
      })
    };

    return {
      repository: new MegatoneProductsRepository(http as never),
      http
    };
  };

  it('uses offset as a logical page and skips Megatone empty physical pages', async () => {
    const { repository, http } = createRepository();

    const result = await repository.listIds({ offset: 4, limit: 10 });

    expect(result.items).toHaveLength(10);
    expect(result.items[0]).toEqual({ publicationId: 31, sellerSku: 'SKU-31' });
    expect(result.total).toBe(100);
    expect(result.offset).toBe(4);
    expect(result.nextOffset).toBe(5);
    expect(http.get).toHaveBeenCalledWith(
      '/api/MarketplaceCore/Publicaciones',
      expect.objectContaining({
        params: expect.objectContaining({
          Pagina: 6,
          Cantidad: 10
        })
      })
    );
  });

  it('keeps scanning when a later physical page is unexpectedly empty', async () => {
    const { repository, http } = createRepository();

    const result = await repository.listIds({ offset: 9, limit: 10 });

    expect(result.items).toHaveLength(10);
    expect(result.items[0]).toEqual({ publicationId: 81, sellerSku: 'SKU-81' });
    expect(result.offset).toBe(9);
    expect(result.nextOffset).toBe(10);
    expect(http.get).toHaveBeenCalledWith(
      '/api/MarketplaceCore/Publicaciones',
      expect.objectContaining({
        params: expect.objectContaining({
          Pagina: 13,
          Cantidad: 10
        })
      })
    );
    expect(http.get).toHaveBeenCalledWith(
      '/api/MarketplaceCore/Publicaciones',
      expect.objectContaining({
        params: expect.objectContaining({
          Pagina: 14,
          Cantidad: 10
        })
      })
    );
  });

  it('returns disjoint batches using offset 1, 2, 3', async () => {
    const { repository } = createRepository();

    const firstPage = await repository.listIds({ offset: 1, limit: 10 });
    const secondPage = await repository.listIds({ offset: firstPage.nextOffset!, limit: 10 });
    const thirdPage = await repository.listIds({ offset: secondPage.nextOffset!, limit: 10 });

    expect(firstPage.items.map(item => item.publicationId)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(firstPage.nextOffset).toBe(2);
    expect(secondPage.items.map(item => item.publicationId)).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    expect(secondPage.nextOffset).toBe(3);
    expect(thirdPage.items.map(item => item.publicationId)).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
    expect(thirdPage.nextOffset).toBe(4);
  });
});
