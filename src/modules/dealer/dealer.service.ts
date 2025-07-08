import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { Dealer } from './entities/dealer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DealerService {
  constructor(
    @InjectRepository(Dealer)
    private dealerRepository: Repository<Dealer>,
  ) {}

  async create(createDealerDto: CreateDealerDto): Promise<Dealer> {
    const dealer = this.dealerRepository.create(createDealerDto);
    const savedDealer = await this.dealerRepository.save(dealer);

    const dealerWithRelations = await this.dealerRepository.findOne({
      where: { id: savedDealer.id },
      relations: ['vehicle', 'routes'],
    });

    if (!dealerWithRelations) {
      throw new NotFoundException(`Dealer with ID ${savedDealer.id} not found`);
    }

    return dealerWithRelations;
  }
  async findAll(): Promise<Dealer[]> {
    return await this.dealerRepository.find({
      relations: ['vehicles', 'routes'],
    });
  }

  async findOne(id: number): Promise<Dealer> {
    const dealer = await this.dealerRepository.findOne({
      where: { id },
      relations: ['vehicles', 'routes'],
    });

    if (!dealer) {
      throw new NotFoundException(`Dealer with ID ${id} not found`);
    }

    return dealer;
  }

  async update(id: number, updateDealerDto: UpdateDealerDto): Promise<Dealer> {
    const dealer = await this.findOne(id);
    Object.assign(dealer, updateDealerDto);
    return await this.dealerRepository.save(dealer);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dealerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Dealer with ID ${id} not found`);
    }
  }
}
