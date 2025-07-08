import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  OrderResponse,
  LatLng,
  OrderItemResponse,
} from './dto/order-response.dto';
import { ClientService } from '../client/client.service';
import { DetailsOrderService } from '../details-order/details-order.service';

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

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'items'],
    });
    if (!order) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return order;
  }

  async findAllFormatted(): Promise<OrderResponse[]> {
    const orders = await this.orderRepository.find({
      relations: ['items'],
    });

    return orders.map((order) => this.formatOrderResponse(order));
  }

  async findOneFormatted(id: string): Promise<OrderResponse> {
    const order = await this.findOne(id);
    return this.formatOrderResponse(order);
  }

  private formatOrderResponse(order: Order): OrderResponse {
    return {
      id: order.id,
      clientName: order.clientName,
      clientPhone: order.clientPhone,
      deliveryLocation: new LatLng(
        order.deliveryLatitude,
        order.deliveryLongitude,
      ),
      address: order.address,
      items: order.items.map(
        (item): OrderItemResponse => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.unitPrice,
        }),
      ),
      status: order.status,
      createdAt: order.createdAt,
      totalAmount: order.totalAmount,
    };
  }

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
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    for (const item of createOrderDto.items) {
      await this.detailsOrderService.create({
        orderId: savedOrder.id,
        productId: parseInt(item.id), // assuming product ID is stored as number
        quantity: item.quantity,
        unitPrice: item.price,
        name: item.name,
        subTotal: item.quantity * item.price,
      });
    }

    return await this.findOne(savedOrder.id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
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

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return await this.orderRepository.save(order);
  }
}
