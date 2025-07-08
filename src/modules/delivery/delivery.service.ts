import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async findAll(): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      relations: ['route'],
    });
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
      relations: ['route'],
    });
    if (!delivery) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }
    return delivery;
  }

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const delivery = this.deliveryRepository.create(createDeliveryDto);
    return await this.deliveryRepository.save(delivery);
  }

  async update(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.findOne(id);
    Object.assign(delivery, updateDeliveryDto);
    return await this.deliveryRepository.save(delivery);
  }

  async remove(id: number): Promise<void> {
    const result = await this.deliveryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }
  }

  async updateDeliveryStatus(id: number, state: string): Promise<Delivery> {
    const delivery = await this.findOne(id);
    delivery.state = state;
    return await this.deliveryRepository.save(delivery);
  }

  async findByOrderDelivery(orderDelivery: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { order_delivery: orderDelivery },
      relations: ['route'],
    });
    if (!delivery) {
      throw new NotFoundException(
        `Entrega para el pedido ${orderDelivery} no encontrada`,
      );
    }
    return delivery;
  }
}
