import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Route } from '../../route/entities/route.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  order_delivery: number;

  @Column({ default: 'pendiente' })
  state: string;

  @Column({ nullable: true })
  location_delivery: string;

  @Column({ type: 'timestamp', nullable: true })
  actual_delivery_date: Date;

  @Column({ nullable: true })
  payment_type: string;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ nullable: true })
  sequence: number;

  @Column({ nullable: true, name: 'route_order' })
  routeOrder: number;

  @ManyToOne(() => Route, (route) => route.delivery)
  route: Route;

  @OneToOne(() => Order, (order) => order.delivery)
  order: Order;
}
