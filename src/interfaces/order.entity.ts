import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int' })
  totalCost: number;

  @Column({ type: 'varchar' })
  status?: string;
  // la order deberíatener a un user ademas del customer

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
}
