import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderFormattedDto } from './dto/order-formatted.dto';
import { DeliveryStatsDto } from '../delivery/dto/delivery-stats.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('formatted')
  findAllFormatted(): Promise<OrderFormattedDto[]> {
    return this.orderService.findAllFormatted();
  }

  @Get('pending')
  findPendingFormatted(): Promise<OrderFormattedDto[]> {
    return this.orderService.findPendingFormatted();
  }

  @Get('stats')
  getDeliveryStats(): Promise<DeliveryStatsDto> {
    return this.orderService.getDeliveryStats();
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ): Promise<OrderFormattedDto> {
    return this.orderService.updateOrderStatus(+id, updateStatusDto);
  }

  @Get(':id/formatted')
  findOneFormatted(@Param('id') id: string): Promise<OrderFormattedDto> {
    return this.orderService.findOneFormatted(+id);
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string): Promise<Order[]> {
    return this.orderService.getOrdersByClientId(+clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Patch(':id/status-legacy')
  updateStatusLegacy(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus_Legacy(+id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
