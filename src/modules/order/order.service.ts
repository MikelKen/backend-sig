import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import {
  OrderFormattedDto,
  OrderItemFormattedDto,
} from './dto/order-formatted.dto';
import { ClientService } from '../client/client.service';
import { DetailsOrderService } from '../details-order/details-order.service';
import { DeliveryStatsDto } from '../delivery/dto/delivery-stats.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private detailsOrderService: DetailsOrderService,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['client', 'items'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'items'],
    });
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return order;
  }

  // Método principal para Flutter - Obtener todos los pedidos formateados
  async findAllFormatted(): Promise<OrderFormattedDto[]> {
    const orders = await this.orderRepository.find({
      relations: ['items'],
      order: { createdAt: 'DESC' },
    });

    return orders.map((order) => this.formatOrderForFlutter(order));
  }

  // Método para Flutter - Obtener solo pedidos pendientes
  async findPendingFormatted(): Promise<OrderFormattedDto[]> {
    const orders = await this.orderRepository.find({
      where: [
        { status: OrderStatus.PENDIENTE },
        { status: OrderStatus.EN_RUTA },
      ],
      relations: ['items'],
      order: { createdAt: 'ASC' },
    });

    return orders.map((order) => this.formatOrderForFlutter(order));
  }

  // Método para Flutter - Obtener estadísticas de entregas
  async getDeliveryStats(): Promise<DeliveryStatsDto> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const totalOrders = await this.orderRepository.count();

    const deliveredToday = await this.orderRepository.count({
      where: {
        status: OrderStatus.ENTREGADO,
        deliveryTime: Between(today, tomorrow),
      },
    });

    const pendingOrders = await this.orderRepository.count({
      where: { status: OrderStatus.PENDIENTE },
    });

    const inRouteOrders = await this.orderRepository.count({
      where: { status: OrderStatus.EN_RUTA },
    });

    // Calcular ingresos del día
    const todayDelivered = await this.orderRepository.find({
      where: {
        status: OrderStatus.ENTREGADO,
        deliveryTime: Between(today, tomorrow),
      },
    });

    const totalRevenue = todayDelivered.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0,
    );

    return {
      totalOrders,
      deliveredToday,
      pendingOrders,
      inRouteOrders,
      totalRevenue,
    };
  }

  // Método para Flutter - Actualizar estado de pedido
  async updateOrderStatus(
    id: number,
    updateStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderFormattedDto> {
    const order = await this.findOne(id);

    order.status = updateStatusDto.status;

    // Remover type assertion innecesaria - PaymentMethod ya es el tipo correcto
    if (updateStatusDto.paymentMethod) {
      order.paymentMethod = updateStatusDto.paymentMethod;
    }

    if (updateStatusDto.observations) {
      order.observations = updateStatusDto.observations;
    }

    // Si se marca como entregado, establecer fecha de entrega
    if (updateStatusDto.status === OrderStatus.ENTREGADO) {
      order.deliveryTime = new Date();
      order.paid = true;
    }

    const savedOrder = await this.orderRepository.save(order);
    return this.formatOrderForFlutter(savedOrder);
  }

  // Método existente mejorado
  async findOneFormatted(id: number): Promise<OrderFormattedDto> {
    const order = await this.findOne(id);
    return this.formatOrderForFlutter(order);
  }

  // Método privado para formatear órdenes para Flutter
  private formatOrderForFlutter(order: Order): OrderFormattedDto {
    return {
      id: order.id,
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      deliveryLocation: {
        latitude: Number(order.deliveryLatitude),
        longitude: Number(order.deliveryLongitude),
      },
      address: order.address,
      items: order.items.map(
        (item): OrderItemFormattedDto => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: Number(item.unitPrice),
        }),
      ),
      status: order.status,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      deliveryTime: order.deliveryTime,
      observations: order.observations || '',
      totalAmount: Number(order.totalAmount),
    };
  }

  // Métodos existentes (mantener compatibilidad)
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Verificar que el cliente existe
    await this.clientService.findOne(createOrderDto.cliente_id);

    // Create the order first
    const order = this.orderRepository.create({
      id: createOrderDto.id,
      cliente_id: createOrderDto.cliente_id,
      clientName: createOrderDto.clientName,
      clientPhone: createOrderDto.clientPhone,
      address: createOrderDto.address,
      deliveryLatitude: createOrderDto.deliveryLatitude,
      deliveryLongitude: createOrderDto.deliveryLongitude,
      status: createOrderDto.status || OrderStatus.PENDIENTE,
      createdAt: createOrderDto.createdAt || new Date(),
      totalAmount: createOrderDto.totalAmount,
      estimatedDeliveryDate: createOrderDto.estimatedDeliveryDate,
      paid: createOrderDto.paid || false,
      // Remover type assertion innecesaria
      paymentMethod: createOrderDto.paymentMethod,
      observations: createOrderDto.observations,
      deliveryTime: createOrderDto.deliveryTime,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    for (const item of createOrderDto.items) {
      await this.detailsOrderService.create({
        orderId: savedOrder.id,
        productId: parseInt(item.id),
        quantity: item.quantity,
        unitPrice: item.price,
        name: item.name,
        subTotal: item.quantity * item.price,
      });
    }

    return await this.findOne(savedOrder.id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    // Si se está actualizando el cliente, verificar que existe
    if (updateOrderDto.cliente_id) {
      await this.clientService.findOne(updateOrderDto.cliente_id);
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
  }

  async getOrdersByClientId(clientId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { cliente_id: clientId },
      relations: ['items'],
    });
  }

  // Método existente - mantener para compatibilidad
  async updateOrderStatus_Legacy(
    id: number,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return await this.orderRepository.save(order);
  }
}
