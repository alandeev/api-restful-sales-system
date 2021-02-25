import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import { join } from 'path';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import Order from './Order';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @JoinColumn({ name: 'order_id' })
  @ManyToOne((type) => Order, (order) => order.order_products)
  order: Order;

  @Column()
  order_id: string;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne((type) => Product)
  product: Product;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
