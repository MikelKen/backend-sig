import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);

    const productWithRelations = await this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['detailsOrder'],
    });

    if (!productWithRelations) {
      throw new NotFoundException(
        `Product with ID ${savedProduct.id} not found`,
      );
    }

    return productWithRelations;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['detailsOrder'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['detailsOrder'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
