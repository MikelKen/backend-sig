import { Dealer } from 'src/modules/dealer/entities/dealer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  active: boolean;

  @Column()
  photo: string;

  @Column({ name: 'capacity_kg' })
  capacityKg: number;

  @Column({ name: 'nro_plate' })
  nroPlate: string;

  @Column()
  model: string;

  @ManyToOne(() => Dealer, (dealer) => dealer.vehicles)
  @JoinColumn()
  dealer: Dealer;
}
