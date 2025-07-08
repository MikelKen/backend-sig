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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  findAll(): Promise<Delivery[]> {
    return this.deliveryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Delivery> {
    return this.deliveryService.findOne(+id);
  }

  @Get('order/:orderId')
  findByOrderId(@Param('orderId') orderId: string): Promise<Delivery> {
    return this.deliveryService.findByOrderDelivery(+orderId);
  }

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('state') state: string,
  ): Promise<Delivery> {
    return this.deliveryService.updateDeliveryStatus(+id, state);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.deliveryService.remove(+id);
  }
}
