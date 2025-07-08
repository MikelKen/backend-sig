import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../modules/order/entities/order.entity';
import { DetailsOrder } from '../modules/details-order/entities/details-order.entity';
import { Product } from '../modules/product/entities/product.entity';
import { Client } from '../modules/client/entities/client.entity';

@Injectable()
export class OrderSeeder {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(DetailsOrder)
    private detailsOrderRepository: Repository<DetailsOrder>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async syncOrder() {
    console.log('🔄 Sincronizando Orders...');

    // Verificar si ya existen datos
    const existingOrders = await this.orderRepository.count();
    if (existingOrders > 0) {
      console.log('✅ Orders ya existen, saltando seeder.');
      return;
    }

    // Crear productos de ejemplo si no existen
    await this.createSampleProducts();

    // Crear clientes de ejemplo si no existen
    await this.createSampleClients();

    // Obtener los productos y clientes creados
    const products = await this.productRepository.find();
    const clients = await this.clientRepository.find();

    if (products.length < 4 || clients.length < 2) {
      console.log(
        '❌ No hay suficientes productos o clientes para crear orders.',
      );
      return;
    }

    const orders = [
      {
        cliente_id: clients[0].id,
        clientName: 'María González',
        clientPhone: '+591 7123-4567',
        deliveryLatitude: -17.783333,
        deliveryLongitude: -63.183333,
        address: 'Av. Cristo Redentor #123, 2do Anillo',
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        totalAmount: 55.5,
        paid: false,
        items: [
          {
            productId: products[0].id,
            name: 'Pan integral x12',
            quantity: 2,
            unitPrice: 15.0,
          },
          {
            productId: products[1].id,
            name: 'Leche 1L',
            quantity: 3,
            unitPrice: 8.5,
          },
        ],
      },
      {
        cliente_id: clients[1].id,
        clientName: 'Carlos Mendoza',
        clientPhone: '+591 7234-5678',
        deliveryLatitude: -17.789444,
        deliveryLongitude: -63.175278,
        address: 'Calle Warnes #456, Equipetrol',
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        totalAmount: 48.0,
        paid: false,
        items: [
          {
            productId: products[2].id,
            name: 'Yogurt natural',
            quantity: 4,
            unitPrice: 6.0,
          },
          {
            productId: products[3].id,
            name: 'Galletas',
            quantity: 2,
            unitPrice: 12.0,
          },
        ],
      },
    ];

    for (const orderData of orders) {
      // Crear la orden
      const order = this.orderRepository.create({
        cliente_id: orderData.cliente_id,
        clientName: orderData.clientName,
        clientPhone: orderData.clientPhone,
        deliveryLatitude: orderData.deliveryLatitude,
        deliveryLongitude: orderData.deliveryLongitude,
        address: orderData.address,
        status: orderData.status,
        createdAt: orderData.createdAt,
        totalAmount: orderData.totalAmount,
        paid: orderData.paid,
      });

      const savedOrder = await this.orderRepository.save(order);

      // Crear los detalles de la orden
      for (const item of orderData.items) {
        const detailsOrder = this.detailsOrderRepository.create({
          orderId: savedOrder.id,
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subTotal: item.quantity * item.unitPrice,
        });

        await this.detailsOrderRepository.save(detailsOrder);
      }
    }

    console.log('✅ Orders creadas exitosamente.');
  }

  private async createSampleProducts() {
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) return;

    const products = [
      {
        name: 'Pan integral x12',
        active: true,
        stock: 100,
        image: 'pan-integral.jpg',
        category: 'Panadería',
        color: 'Marrón',
        size: 'Grande',
        price: 15.0,
        description: 'Pan integral fresco, paquete de 12 unidades',
      },
      {
        name: 'Leche 1L',
        active: true,
        stock: 50,
        image: 'leche.jpg',
        category: 'Lácteos',
        color: 'Blanco',
        size: '1L',
        price: 8.5,
        description: 'Leche fresca entera de 1 litro',
      },
      {
        name: 'Yogurt natural',
        active: true,
        stock: 75,
        image: 'yogurt.jpg',
        category: 'Lácteos',
        color: 'Blanco',
        size: '200ml',
        price: 6.0,
        description: 'Yogurt natural sin azúcar',
      },
      {
        name: 'Galletas',
        active: true,
        stock: 30,
        image: 'galletas.jpg',
        category: 'Snacks',
        color: 'Dorado',
        size: 'Mediano',
        price: 12.0,
        description: 'Galletas dulces variadas',
      },
    ];

    for (const productData of products) {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
    }
  }

  private async createSampleClients() {
    const existingClients = await this.clientRepository.count();
    if (existingClients > 0) return;

    const clients = [
      {
        name: 'María',
        lastName: 'González',
        email: 'maria.gonzalez@email.com',
        phone: '+591 7123-4567',
        address: 'Av. Cristo Redentor #123, 2do Anillo',
      },
      {
        name: 'Carlos',
        lastName: 'Mendoza',
        email: 'carlos.mendoza@email.com',
        phone: '+591 7234-5678',
        address: 'Calle Warnes #456, Equipetrol',
      },
    ];

    for (const clientData of clients) {
      const client = this.clientRepository.create(clientData);
      await this.clientRepository.save(client);
    }
  }
}
