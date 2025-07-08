import { Route } from 'src/modules/route/entities/route.entity';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Dealer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column({ name: 'registration_date' })
  registrationDate: Date;

  @Column()
  address: string;

  @Column()
  dni: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Route, (route) => route.dealer)
  routes: Route[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.dealer)
  vehicles: Vehicle[];
}
