import { Module } from '@nestjs/common';
import { DetailsOrderService } from './details-order.service';
import { DetailsOrderController } from './details-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsOrder } from './entities/details-order.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailsOrder, Product])],
  controllers: [DetailsOrderController],
  providers: [DetailsOrderService],
  exports: [DetailsOrderService],
})
export class DetailsOrderModule {}
