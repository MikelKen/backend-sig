import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSeeder } from './client.seed';
import { ProductSeeder } from './product.seed';
import { OrderSeeder } from './order.seed';
import { MainSeeder } from './main.seed';
import { Client } from '../modules/client/entities/client.entity';
import { Order } from '../modules/order/entities/order.entity';
import { DetailsOrder } from '../modules/details-order/entities/details-order.entity';
import { Product } from '../modules/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Product, Order, DetailsOrder])],
  providers: [ClientSeeder, ProductSeeder, OrderSeeder, MainSeeder],
  exports: [MainSeeder],
})
export class SeedModule {}
