import RedisCache from '@shared/cache/RedisCache';
import HttpException from '@shared/errors/HttpException';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const teste = Math.random().toString();
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(teste);

    if (productExists) {
      throw new HttpException('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
