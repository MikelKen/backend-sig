import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { DeliveryService } from '../delivery/delivery.service';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    private deliveryService: DeliveryService,
  ) {}

  async findAll(): Promise<Route[]> {
    return await this.routeRepository.find({
      relations: ['delivery'],
    });
  }

  async findOne(id: number): Promise<Route> {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['delivery'],
    });
    if (!route) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }
    return route;
  }

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    // Si se proporciona un ID de entrega, verificar que existe
    if (createRouteDto.deliveryId) {
      await this.deliveryService.findOne(createRouteDto.deliveryId);

      // Crear la ruta sin el ID de entrega primero
      const { deliveryId, ...routeData } = createRouteDto;
      const route = this.routeRepository.create(routeData);

      // Guardar la ruta
      const savedRoute = await this.routeRepository.save(route);

      // Asociar la entrega a la ruta
      savedRoute.delivery = await this.deliveryService.findOne(deliveryId);

      // Guardar nuevamente con la relación
      return await this.routeRepository.save(savedRoute);
    } else {
      // Si no hay entrega, crear la ruta normalmente
      const route = this.routeRepository.create(createRouteDto);
      return await this.routeRepository.save(route);
    }
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id);

    // Si se está actualizando la entrega, verificar que existe
    if (updateRouteDto.deliveryId) {
      await this.deliveryService.findOne(updateRouteDto.deliveryId);

      // Crear una copia sin el ID de entrega
      const { deliveryId, ...routeData } = updateRouteDto;

      // Actualizar los datos de la ruta
      Object.assign(route, routeData);

      // Actualizar la relación con la entrega
      route.delivery = await this.deliveryService.findOne(deliveryId);
    } else {
      // Actualizar solo los datos de la ruta
      Object.assign(route, updateRouteDto);
    }

    return await this.routeRepository.save(route);
  }

  async remove(id: number): Promise<void> {
    const result = await this.routeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }
  }

  async findByDate(date: Date): Promise<Route[]> {
    return await this.routeRepository.find({
      where: { date },
      relations: ['delivery'],
    });
  }
}
