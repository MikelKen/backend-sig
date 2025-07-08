import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientModule } from '../client/client.module';
import { DetailsOrderModule } from '../details-order/details-order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientModule,
    DetailsOrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
