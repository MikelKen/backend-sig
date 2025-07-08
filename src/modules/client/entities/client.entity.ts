import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateRegister: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
