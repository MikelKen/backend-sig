// order.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { DetailsOrder } from '../../details-order/entities/details-order.entity';
import { Delivery } from '../../delivery/entities/delivery.entity';

export enum OrderStatus {
  PENDIENTE = 'pendiente',
  EN_RUTA = 'en_ruta',
  ENTREGADO = 'entregado',
  NO_ENTREGADO = 'no_entregado',
  PRODUCTO_INCORRECTO = 'producto_incorrecto',
  CANCELADO = 'cancelado',
}

export enum PaymentMethod {
  EFECTIVO = 'efectivo',
  QR = 'qr',
  TRANSFERENCIA = 'transferencia',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  cliente_id: number;

  @Column({ name: 'client_name' })
  clientName: string;

  @Column({ name: 'client_phone' })
  clientPhone: string;

  @Column({ name: 'delivery_address' })
  address: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'total_amount',
  })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDIENTE,
  })
  status: OrderStatus;

  @Column({ type: 'timestamp', nullable: true })
  estimatedDeliveryDate: Date;

  // Campo para el tiempo real de entrega
  @Column({ type: 'timestamp', nullable: true, name: 'delivery_time' })
  deliveryTime: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    name: 'delivery_latitude',
  })
  deliveryLatitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    name: 'delivery_longitude',
  })
  deliveryLongitude: number;

  @Column({ type: 'boolean', default: false })
  paid: boolean;

  // Método de pago con enum tipado
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
    name: 'payment_method',
  })
  paymentMethod?: PaymentMethod;

  // Observaciones de entrega
  @Column({ type: 'text', nullable: true })
  observations?: string;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'cliente_id' })
  client: Client;

  @OneToOne(() => Delivery, (delivery) => delivery.order)
  @JoinColumn()
  delivery: Delivery;

  @OneToMany(() => DetailsOrder, (detailsOrder) => detailsOrder.order)
  items: DetailsOrder[];
}
