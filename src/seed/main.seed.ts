import { Injectable } from '@nestjs/common';
import { ClientSeeder } from './client.seed';
import { ProductSeeder } from './product.seed';
import { OrderSeeder } from './order.seed';

@Injectable()
export class MainSeeder {
  constructor(
    private readonly clientSeeder: ClientSeeder,
    private readonly productSeeder: ProductSeeder,
    private readonly orderSeeder: OrderSeeder,
  ) {}

  async run() {
    console.log('🚀 Iniciando Seeders...');

    // Primero crear clientes
    await this.clientSeeder.syncClient();

    // Luego crear productos
    await this.productSeeder.syncProduct();

    // Finalmente crear órdenes
    await this.orderSeeder.syncOrder();

    console.log('✅ Seeders completados.');
  }
}
