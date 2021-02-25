import Customer from "@modules/customers/typeorm/entities/Customer";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findAll(): Promise<Order[]> {
    const orders = await this.find({
      relations: ['customer', 'order_products'],
    });

    return orders;
  }

  public findById(orderId: string): Promise<Order | undefined> {
    const order = this.findOne(orderId, {
      relations: ['customer', 'order_products'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order>{
    const order = this.create({
      customer: customer,
      order_products: products
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
