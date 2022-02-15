import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToMany(() => Product, (product) => product.orders)
  products: Product[];
}
