import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

// Configuración de TypeORM para la conexión a la base de datos PostgreSQL
// Se utiliza el paquete pg para la conexión a PostgreSQL, por lo que se debe instalar con el siguiente comando:

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  /*
    en el module princiapl en inject:[ConfigService],  
    me permite para que aqui 
    
    */
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASS'),
  database: configService.get('DATABASE_NAME'),
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  entities: [join(__dirname + '../../**/*.entity.{js,ts}')],

  //Para generar tablas en BD
  synchronize: false,
});
