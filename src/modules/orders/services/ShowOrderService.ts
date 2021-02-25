import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import HttpException from '@shared/errors/HttpException';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  order_id: string;
}

class ShowOrderService {
  public async execute({ order_id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(order_id);
    if (!order) {
      throw new HttpException("Order not found");
    }

    return order;
  }
}

export default ShowOrderService;
