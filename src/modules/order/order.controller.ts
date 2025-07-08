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
import { OrderResponse } from './dto/order-response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('formatted')
  findAllFormatted(): Promise<OrderResponse[]> {
    return this.orderService.findAllFormatted();
  }

  @Get('client/:clientId')
  findByClientId(@Param('clientId') clientId: string): Promise<Order[]> {
    return this.orderService.getOrdersByClientId(+clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Get(':id/formatted')
  findOneFormatted(@Param('id') id: string): Promise<OrderResponse> {
    return this.orderService.findOneFormatted(id);
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
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
