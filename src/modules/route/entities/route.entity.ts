import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Delivery } from '../../delivery/entities/delivery.entity';
import { Dealer } from '../../dealer/entities/dealer.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  hour_end: string;

  @Column({ type: 'int' })
  delivery_quantity: number;

  @Column({ type: 'time' })
  hour_start: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_distance: number;

  @Column({ type: 'text', nullable: true })
  polyline: string;

  @Column({ type: 'int', nullable: true, name: 'estimated_duration' })
  estimatedDuration: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
    name: 'start_latitude',
  })
  startLatitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
    name: 'start_longitude',
  })
  startLongitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
    name: 'end_latitude',
  })
  endLatitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
    name: 'end_longitude',
  })
  endLongitude: number;

  @Column({ default: 'Manual', name: 'optimization_method' })
  optimizationMethod: string;

  @Column({ type: 'boolean', default: false, name: 'is_optimized' })
  isOptimized: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'end_time' })
  endTime: Date;

  @ManyToOne(() => Dealer, (dealer) => dealer.routes)
  @JoinColumn()
  dealer: Dealer;

  @OneToMany(() => Delivery, (delivery) => delivery.route)
  @JoinColumn()
  delivery: Delivery;
}
