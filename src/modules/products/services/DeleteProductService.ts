import RedisCache from '@shared/cache/RedisCache';
import HttpException from '@shared/errors/HttpException';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new HttpException('Product not found.');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
