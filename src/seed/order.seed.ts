import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Order,
  OrderStatus,
  PaymentMethod,
} from '../modules/order/entities/order.entity';
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
    console.log('🔄 Sincronizando Orders de Zapatos...');

    // Verificar si ya existen datos
    const existingOrders = await this.orderRepository.count();
    if (existingOrders > 0) {
      console.log('✅ Orders ya existen, saltando seeder.');
      return;
    }

    // Obtener los productos y clientes
    const products = await this.productRepository.find();
    const clients = await this.clientRepository.find();

    if (products.length < 10 || clients.length < 5) {
      console.log(
        '❌ No hay suficientes productos o clientes para crear orders.',
      );
      return;
    }

    // Coordenadas reales de Santa Cruz de la Sierra, Bolivia
    const santaCruzLocations = [
      { lat: -17.783333, lng: -63.183333, zone: '2do Anillo Norte' },
      { lat: -17.789444, lng: -63.175278, zone: 'Equipetrol Norte' },
      { lat: -17.795556, lng: -63.167222, zone: '3er Anillo Norte' },
      { lat: -17.801667, lng: -63.159167, zone: 'Plan 3000' },
      { lat: -17.7734, lng: -63.185, zone: 'Zona Sur' },
      { lat: -17.7678, lng: -63.1789, zone: 'Villa Olímpica' },
      { lat: -17.7845, lng: -63.1456, zone: 'Villa 1ro de Mayo' },
      { lat: -17.7923, lng: -63.1578, zone: 'Zona Este' },
      { lat: -17.7756, lng: -63.1923, zone: 'Zona Oeste' },
      { lat: -17.7889, lng: -63.1667, zone: 'Centro' },
      { lat: -17.7712, lng: -63.1734, zone: 'Las Palmas' },
      { lat: -17.7834, lng: -63.1545, zone: 'Los Jardines' },
      { lat: -17.7967, lng: -63.1623, zone: 'Equipetrol' },
      { lat: -17.7701, lng: -63.1812, zone: 'Mutualista' },
      { lat: -17.8034, lng: -63.1489, zone: 'Pampa de la Isla' },
    ];

    const orders = [
      // ÓRDENES PENDIENTES (Para testing de rutas)
      {
        cliente_id: clients[0]?.id,
        clientName: 'María González',
        clientPhone: '+591 7123-4567',
        deliveryLatitude: santaCruzLocations[0].lat,
        deliveryLongitude: santaCruzLocations[0].lng,
        address: `Av. Cristo Redentor #123, ${santaCruzLocations[0].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
        totalAmount: 730.0,
        paid: false,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Llamar al llegar, casa color blanco',
        items: [
          { productName: 'Nike Air Max 270', quantity: 1, unitPrice: 450.0 },
          {
            productName: 'Converse Chuck Taylor All Star',
            quantity: 1,
            unitPrice: 280.0,
          },
        ],
      },
      {
        cliente_id: clients[1]?.id,
        clientName: 'Carlos Mendoza',
        clientPhone: '+591 7234-5678',
        deliveryLatitude: santaCruzLocations[1].lat,
        deliveryLongitude: santaCruzLocations[1].lng,
        address: `Calle Warnes #456, ${santaCruzLocations[1].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
        totalAmount: 900.0,
        paid: false,
        paymentMethod: PaymentMethod.QR,
        observations: 'Edificio azul, 2do piso',
        items: [
          {
            productName: 'Adidas Ultraboost 22',
            quantity: 1,
            unitPrice: 520.0,
          },
          { productName: 'Puma RS-X3', quantity: 1, unitPrice: 380.0 },
        ],
      },
      {
        cliente_id: clients[2]?.id,
        clientName: 'Ana Rodríguez',
        clientPhone: '+591 7345-6789',
        deliveryLatitude: santaCruzLocations[2].lat,
        deliveryLongitude: santaCruzLocations[2].lng,
        address: `Av. Banzer #789, ${santaCruzLocations[2].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        totalAmount: 1100.0,
        paid: false,
        paymentMethod: PaymentMethod.QR,
        observations: 'Preferencia de entrega por la tarde',
        items: [
          { productName: 'Dr. Martens 1460', quantity: 1, unitPrice: 720.0 },
          { productName: 'Vans Old Skool', quantity: 1, unitPrice: 320.0 },
          {
            productName: 'Adidas Kids Superstar',
            quantity: 1,
            unitPrice: 200.0,
          },
        ],
      },
      {
        cliente_id: clients[3]?.id,
        clientName: 'Luis Fernández',
        clientPhone: '+591 7456-7890',
        deliveryLatitude: santaCruzLocations[3].lat,
        deliveryLongitude: santaCruzLocations[3].lng,
        address: `Calle Libertad #321, ${santaCruzLocations[3].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
        totalAmount: 1330.0,
        paid: false,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Casa con jardín frontal',
        items: [
          {
            productName: 'Oxford Leather Shoes',
            quantity: 1,
            unitPrice: 750.0,
          },
          { productName: 'Loafers Penny', quantity: 1, unitPrice: 580.0 },
        ],
      },
      {
        cliente_id: clients[4]?.id,
        clientName: 'Elena Vargas',
        clientPhone: '+591 7567-8901',
        deliveryLatitude: santaCruzLocations[4].lat,
        deliveryLongitude: santaCruzLocations[4].lng,
        address: `Av. Santos Dumont #654, ${santaCruzLocations[4].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
        totalAmount: 850.0,
        paid: false,
        paymentMethod: PaymentMethod.QR,
        observations: 'Departamento en 3er piso',
        items: [
          {
            productName: 'Nike Air Force 1 Low',
            quantity: 1,
            unitPrice: 400.0,
          },
          { productName: 'Tacones Altos', quantity: 1, unitPrice: 450.0 },
        ],
      },

      // ÓRDENES EN RUTA
      {
        cliente_id: clients[5]?.id,
        clientName: 'Roberto Morales',
        clientPhone: '+591 7678-9012',
        deliveryLatitude: santaCruzLocations[5].lat,
        deliveryLongitude: santaCruzLocations[5].lng,
        address: `Calle Alemana #987, ${santaCruzLocations[5].zone}`,
        status: OrderStatus.EN_RUTA,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        totalAmount: 1050.0,
        paid: false,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Portón color verde',
        items: [
          {
            productName: 'Timberland 6-Inch Premium',
            quantity: 1,
            unitPrice: 680.0,
          },
          { productName: 'Adidas Gazelle', quantity: 1, unitPrice: 360.0 },
        ],
      },
      {
        cliente_id: clients[6]?.id,
        clientName: 'Patricia Silva',
        clientPhone: '+591 7789-0123',
        deliveryLatitude: santaCruzLocations[6].lat,
        deliveryLongitude: santaCruzLocations[6].lng,
        address: `Av. Roca y Coronado #147, ${santaCruzLocations[6].zone}`,
        status: OrderStatus.EN_RUTA,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        totalAmount: 600.0,
        paid: false,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Referencia: farmacia en la esquina',
        items: [
          { productName: 'Birkenstock Arizona', quantity: 1, unitPrice: 420.0 },
          { productName: 'Adidas Adilette', quantity: 1, unitPrice: 180.0 },
        ],
      },

      // ÓRDENES ENTREGADAS (Para estadísticas)
      {
        cliente_id: clients[7]?.id,
        clientName: 'Diego Herrera',
        clientPhone: '+591 7890-1234',
        deliveryLatitude: santaCruzLocations[7].lat,
        deliveryLongitude: santaCruzLocations[7].lng,
        address: `Av. Moscú #258, ${santaCruzLocations[7].zone}`,
        status: OrderStatus.ENTREGADO,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        deliveryTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        totalAmount: 950.0,
        paid: true,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Entregado correctamente',
        items: [
          {
            productName: 'Red Wing Iron Ranger',
            quantity: 1,
            unitPrice: 950.0,
          },
        ],
      },
      {
        cliente_id: clients[8]?.id,
        clientName: 'Carmen Flores',
        clientPhone: '+591 7901-2345',
        deliveryLatitude: santaCruzLocations[8].lat,
        deliveryLongitude: santaCruzLocations[8].lng,
        address: `Calle Los Cusis #369, ${santaCruzLocations[8].zone}`,
        status: OrderStatus.ENTREGADO,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        deliveryTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        totalAmount: 630.0,
        paid: true,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Cliente muy satisfecho',
        items: [
          { productName: 'Adidas Stan Smith', quantity: 1, unitPrice: 350.0 },
          { productName: 'Ballerinas Clásicas', quantity: 1, unitPrice: 280.0 },
        ],
      },
      {
        cliente_id: clients[9]?.id,
        clientName: 'Andrés Gutiérrez',
        clientPhone: '+591 7012-3456',
        deliveryLatitude: santaCruzLocations[9].lat,
        deliveryLongitude: santaCruzLocations[9].lng,
        address: `Av. G77 #741, ${santaCruzLocations[9].zone}`,
        status: OrderStatus.ENTREGADO,
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
        deliveryTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        totalAmount: 1200.0,
        paid: true,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Entrega rápida y eficiente',
        items: [
          {
            productName: 'Caterpillar Colorado',
            quantity: 1,
            unitPrice: 580.0,
          },
          {
            productName: 'Safety Boots Steel Toe',
            quantity: 1,
            unitPrice: 620.0,
          },
        ],
      },

      // MÁS ÓRDENES ENTREGADAS (Para el día de hoy)
      {
        cliente_id: clients[10]?.id,
        clientName: 'Sofía Ramírez',
        clientPhone: '+591 7123-4560',
        deliveryLatitude: santaCruzLocations[10].lat,
        deliveryLongitude: santaCruzLocations[10].lng,
        address: `Av. Paraguá #852, ${santaCruzLocations[10].zone}`,
        status: OrderStatus.ENTREGADO,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        deliveryTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        totalAmount: 400.0,
        paid: true,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Entrega perfecta',
        items: [
          {
            productName: 'Converse Kids Chuck Taylor',
            quantity: 1,
            unitPrice: 180.0,
          },
          { productName: 'Nike Kids Air Max', quantity: 1, unitPrice: 220.0 },
        ],
      },
      {
        cliente_id: clients[11]?.id,
        clientName: 'Fernando Castro',
        clientPhone: '+591 7234-5601',
        deliveryLatitude: santaCruzLocations[11].lat,
        deliveryLongitude: santaCruzLocations[11].lng,
        address: `Calle Sucre #963, ${santaCruzLocations[11].zone}`,
        status: OrderStatus.ENTREGADO,
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000), // 7 hours ago
        deliveryTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        totalAmount: 830.0,
        paid: true,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Cliente recomendó el servicio',
        items: [
          { productName: 'New Balance 990v5', quantity: 1, unitPrice: 480.0 },
          { productName: 'Adidas Stan Smith', quantity: 1, unitPrice: 350.0 },
        ],
      },

      // ÓRDENES CON PROBLEMAS
      {
        cliente_id: clients[12]?.id,
        clientName: 'Valentina López',
        clientPhone: '+591 7345-6012',
        deliveryLatitude: santaCruzLocations[12].lat,
        deliveryLongitude: santaCruzLocations[12].lng,
        address: `Calle 21 de Mayo #159, ${santaCruzLocations[12].zone}`,
        status: OrderStatus.NO_ENTREGADO,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        totalAmount: 670.0,
        paid: false,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Cliente no se encontraba en domicilio',
        items: [
          { productName: 'Clarks Desert Boot', quantity: 1, unitPrice: 650.0 },
        ],
      },
      {
        cliente_id: clients[13]?.id,
        clientName: 'Gabriel Jiménez',
        clientPhone: '+591 7456-7023',
        deliveryLatitude: santaCruzLocations[13].lat,
        deliveryLongitude: santaCruzLocations[13].lng,
        address: `Av. Monseñor Rivero #357, ${santaCruzLocations[13].zone}`,
        status: OrderStatus.PRODUCTO_INCORRECTO,
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
        totalAmount: 400.0,
        paid: false,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Cliente pidió talla 42, se envió talla 41',
        items: [
          {
            productName: 'Nike Air Force 1 Low',
            quantity: 1,
            unitPrice: 400.0,
          },
        ],
      },

      // MÁS ÓRDENES PENDIENTES PARA TESTING
      {
        cliente_id: clients[14]?.id,
        clientName: 'Isabella Vega',
        clientPhone: '+591 7567-8034',
        deliveryLatitude: santaCruzLocations[14].lat,
        deliveryLongitude: santaCruzLocations[14].lng,
        address: `Calle Campero #468, ${santaCruzLocations[14].zone}`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 150 * 60 * 1000), // 2.5 hours ago
        totalAmount: 740.0,
        paid: false,
        paymentMethod: PaymentMethod.EFECTIVO,
        observations: 'Preferencia de entrega entre 14:00-18:00',
        items: [
          { productName: 'Adidas Gazelle', quantity: 1, unitPrice: 360.0 },
          { productName: 'Vans Old Skool', quantity: 1, unitPrice: 320.0 },
        ],
      },
      {
        cliente_id: clients[15]?.id,
        clientName: 'Sebastián Torres',
        clientPhone: '+591 7678-9045',
        deliveryLatitude: santaCruzLocations[0].lat + 0.01, // Variación pequeña
        deliveryLongitude: santaCruzLocations[0].lng + 0.01,
        address: `Urb. Las Palmas #579, Barrio Las Palmas`,
        status: OrderStatus.PENDIENTE,
        createdAt: new Date(Date.now() - 180 * 60 * 1000), // 3 hours ago
        totalAmount: 1380.0,
        paid: false,
        paymentMethod: PaymentMethod.TRANSFERENCIA,
        observations: 'Urbanización privada, llamar al guardia',
        items: [
          { productName: 'Dr. Martens 1460', quantity: 1, unitPrice: 720.0 },
          {
            productName: 'Converse Chuck Taylor All Star',
            quantity: 1,
            unitPrice: 280.0,
          },
          { productName: 'Puma RS-X3', quantity: 1, unitPrice: 380.0 },
        ],
      },
    ];

    for (const orderData of orders) {
      if (!orderData.cliente_id) continue; // Skip if client doesn't exist

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
        deliveryTime: orderData.deliveryTime,
        totalAmount: orderData.totalAmount,
        paid: orderData.paid,
        paymentMethod: orderData.paymentMethod,
        observations: orderData.observations,
      });

      const savedOrder = await this.orderRepository.save(order);

      // Crear los detalles de la orden
      for (const item of orderData.items) {
        // Buscar el producto por nombre
        const product = products.find((p) => p.name === item.productName);
        if (product) {
          const detailsOrder = this.detailsOrderRepository.create({
            orderId: savedOrder.id,
            productId: product.id,
            name: item.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subTotal: item.quantity * item.unitPrice,
          });

          await this.detailsOrderRepository.save(detailsOrder);
        }
      }
    }

    console.log('✅ Orders de Zapatos creadas exitosamente.');
    console.log(`📊 Resumen:
    - ${orders.filter((o) => o.status === OrderStatus.PENDIENTE).length} órdenes pendientes
    - ${orders.filter((o) => o.status === OrderStatus.EN_RUTA).length} órdenes en ruta  
    - ${orders.filter((o) => o.status === OrderStatus.ENTREGADO).length} órdenes entregadas
    - ${orders.filter((o) => o.status === OrderStatus.NO_ENTREGADO).length} órdenes no entregadas
    - ${orders.filter((o) => o.status === OrderStatus.PRODUCTO_INCORRECTO).length} órdenes con producto incorrecto`);
  }
}
