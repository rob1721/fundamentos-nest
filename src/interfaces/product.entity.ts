import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable, // este crea la tabla intermedia para no hacer directamente el N a N sino N:1 y 1:N
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description?: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar' })
  image?: string;

  @Column({ type: 'int' })
  stock: number;

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

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable() // solo debe ir en un lado de la relación
  categories: Category[];

  @ManyToMany(() => Order, (order) => order.products)
  @JoinTable()
  orders?: Order[];
}
