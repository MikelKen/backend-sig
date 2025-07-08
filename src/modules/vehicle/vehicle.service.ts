import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { Dealer } from '../dealer/entities/dealer.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Dealer)
    private dealerRepository: Repository<Dealer>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const dealer = await this.dealerRepository.findOne({
      where: { id: createVehicleDto.dealerId },
    });

    if (!dealer) {
      throw new NotFoundException(
        `Dealer with ID ${createVehicleDto.dealerId} not found`,
      );
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      dealer,
    });

    return await this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find({
      relations: ['dealer'],
    });
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['dealer'],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    if (updateVehicleDto.dealerId) {
      const dealer = await this.dealerRepository.findOne({
        where: { id: updateVehicleDto.dealerId },
      });

      if (!dealer) {
        throw new NotFoundException(
          `Dealer with ID ${updateVehicleDto.dealerId} not found`,
        );
      }

      vehicle.dealer = dealer;
    }

    Object.assign(vehicle, updateVehicleDto);
    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.vehicleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  }
}
