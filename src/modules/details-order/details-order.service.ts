import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetailsOrderDto } from './dto/create-details-order.dto';
import { UpdateDetailsOrderDto } from './dto/update-details-order.dto';
import { DetailsOrder } from './entities/details-order.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DetailsOrderService {
  constructor(
    @InjectRepository(DetailsOrder)
    private detailsOrderRepository: Repository<DetailsOrder>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    createDetailsOrderDto: CreateDetailsOrderDto,
  ): Promise<DetailsOrder> {
    // Verificar si el producto existe
    const product = await this.productRepository.findOne({
      where: { id: createDetailsOrderDto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createDetailsOrderDto.productId} not found`,
      );
    }

    const detailsOrder = this.detailsOrderRepository.create(
      createDetailsOrderDto,
    );
    const savedDetailsOrder =
      await this.detailsOrderRepository.save(detailsOrder);

    const detailsOrderWithRelations = await this.detailsOrderRepository.findOne(
      {
        where: { id: savedDetailsOrder.id },
        relations: ['product', 'order'],
      },
    );

    if (!detailsOrderWithRelations) {
      throw new NotFoundException(
        `Details Order with ID ${savedDetailsOrder.id} not found`,
      );
    }

    return detailsOrderWithRelations;
  }
  async findAll(): Promise<DetailsOrder[]> {
    return await this.detailsOrderRepository.find({
      relations: ['product', 'order'],
    });
  }

  async findOne(id: string): Promise<DetailsOrder> {
    const detailsOrder = await this.detailsOrderRepository.findOne({
      where: { id },
      relations: ['product', 'order'],
    });

    if (!detailsOrder) {
      throw new NotFoundException(`Details Order with ID ${id} not found`);
    }

    return detailsOrder;
  }

  async update(
    id: string,
    updateDetailsOrderDto: UpdateDetailsOrderDto,
  ): Promise<DetailsOrder> {
    const detailsOrder = await this.findOne(id);

    if (updateDetailsOrderDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: updateDetailsOrderDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${updateDetailsOrderDto.productId} not found`,
        );
      }
    }

    Object.assign(detailsOrder, updateDetailsOrderDto);
    return await this.detailsOrderRepository.save(detailsOrder);
  }

  async remove(id: string): Promise<void> {
    const result = await this.detailsOrderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Details Order with ID ${id} not found`);
    }
  }
}
