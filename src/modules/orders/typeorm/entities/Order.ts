import Customer from '@modules/customers/typeorm/entities/Customer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany((type) => OrdersProducts, (order_products) => order_products.order, { cascade: true })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
