import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dealer } from '../dealer/entities/dealer.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Dealer])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
