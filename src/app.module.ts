import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ClientModule } from './modules/client/client.module';
import { ProductModule } from './modules/product/product.module';
import { DetailsOrderModule } from './modules/details-order/details-order.module';
import { OrderModule } from './modules/order/order.module';
import { DealerModule } from './modules/dealer/dealer.module';
import { RouteModule } from './modules/route/route.module';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    //forRoot Se utliza en el modulo principal de la aplicacion manera general
    //forFeature en modulos Internos
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService], //me permite agregar el inyectar osea acceder al archivo de typeOrmConfig
    }),
    VehicleModule,
    ClientModule,
    ProductModule,
    DetailsOrderModule,
    OrderModule,
    DealerModule,
    RouteModule,
    DeliveryModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//PAra iniciar el proyecto, primero crear la base de datos en postgres y luego ejecutar el siguiente comando:
// npm run start:dev
