import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), DeliveryModule],
  controllers: [RouteController],
  providers: [RouteService],
  exports: [RouteService],
})
export class RouteModule {}
