import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  address: string;

  @OneToMany(() => Order, (order) => order.customer, { nullable: true })
  orders?: string[];
}
