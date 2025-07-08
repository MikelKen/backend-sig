import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './entities/route.entity';
import { Order, OrderStatus } from '../order/entities/order.entity';
import { Delivery } from '../delivery/entities/delivery.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateRouteFlutterDto } from './dto/create-route-flutter.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteFormattedDto } from './dto/route-formatted.dto';
import { OrderFormattedDto } from '../order/dto/order-formatted.dto';
import { DeliveryService } from '../delivery/delivery.service';

// Interfaz para tipar los puntos del polyline
interface PolylinePoint {
  latitude: number;
  longitude: number;
}

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
    private deliveryService: DeliveryService,
  ) {}

  // ===== MÉTODOS PARA FLUTTER =====

  async createRouteForFlutter(
    createRouteDto: CreateRouteFlutterDto,
  ): Promise<RouteFormattedDto> {
    // Verificar que todas las órdenes existen
    const orders = await this.orderRepository.find({
      where: createRouteDto.orderIds.map((id) => ({ id })),
      relations: ['items'],
    });

    if (orders.length !== createRouteDto.orderIds.length) {
      throw new NotFoundException('Una o más órdenes no fueron encontradas');
    }

    // Crear la ruta usando los nombres correctos de los campos de la entidad
    const routeData: Partial<Route> = {
      date: new Date(),
      hour_start: new Date().toLocaleTimeString('es-ES', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
      delivery_quantity: createRouteDto.orderIds.length,
      total_distance: createRouteDto.totalDistance,
      polyline: createRouteDto.polyline || '',
      // Campos adicionales que agregaste para Flutter
      startLatitude: createRouteDto.startLatitude,
      startLongitude: createRouteDto.startLongitude,
      endLatitude: createRouteDto.endLatitude,
      endLongitude: createRouteDto.endLongitude,
      estimatedDuration: createRouteDto.estimatedDuration,
      optimizationMethod: createRouteDto.optimizationMethod || 'Optimized',
      isOptimized: createRouteDto.isOptimized ?? true,
      createdAt: new Date(),
    };

    // Si tu entidad Route tiene UUID como ID, incluirlo
    if (createRouteDto.id) {
      routeData.id = createRouteDto.id;
    }

    const route = this.routeRepository.create(routeData);
    const savedRoute = await this.routeRepository.save(route);

    // Crear deliveries para cada orden y asociarlas a la ruta
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      // Actualizar estado de la orden a EN_RUTA
      order.status = OrderStatus.EN_RUTA;
      await this.orderRepository.save(order);

      // Crear o actualizar delivery
      let delivery = await this.deliveryRepository.findOne({
        where: { order: { id: order.id } },
        relations: ['order'],
      });

      if (!delivery) {
        // Crear nuevo delivery
        const deliveryData: Partial<Delivery> = {
          order_delivery: order.id,
          state: 'en_ruta',
          latitude: order.deliveryLatitude,
          longitude: order.deliveryLongitude,
          location_delivery: order.address,
          sequence: i + 1,
          routeOrder: i + 1,
          route: savedRoute,
          order: order,
        };

        delivery = this.deliveryRepository.create(deliveryData);
      } else {
        // Actualizar delivery existente
        delivery.route = savedRoute;
        delivery.routeOrder = i + 1;
        delivery.sequence = i + 1;
        delivery.state = 'en_ruta';
      }

      await this.deliveryRepository.save(delivery);
    }

    // Cargar la ruta completa con relaciones para retornar
    const completeRoute = await this.routeRepository.findOne({
      where: { id: savedRoute.id },
      relations: ['deliveries', 'deliveries.order', 'deliveries.order.items'],
    });

    return this.formatRouteForFlutter(completeRoute!);
  }

  async findAllFormattedForFlutter(): Promise<RouteFormattedDto[]> {
    const routes = await this.routeRepository.find({
      relations: ['deliveries', 'deliveries.order', 'deliveries.order.items'],
      order: { createdAt: 'DESC' },
    });

    return routes.map((route) => this.formatRouteForFlutter(route));
  }

  async findOneFormattedForFlutter(id: number): Promise<RouteFormattedDto> {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['deliveries', 'deliveries.order', 'deliveries.order.items'],
    });

    if (!route) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }

    return this.formatRouteForFlutter(route);
  }

  async startRoute(id: number): Promise<RouteFormattedDto> {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['deliveries', 'deliveries.order', 'deliveries.order.items'],
    });

    if (!route) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }

    route.startTime = new Date();
    route.hour_start = new Date().toLocaleTimeString('es-ES', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const savedRoute = await this.routeRepository.save(route);
    return this.formatRouteForFlutter(savedRoute);
  }

  async endRoute(id: number): Promise<RouteFormattedDto> {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['deliveries', 'deliveries.order', 'deliveries.order.items'],
    });

    if (!route) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }

    route.endTime = new Date();
    route.hour_end = new Date().toLocaleTimeString('es-ES', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const savedRoute = await this.routeRepository.save(route);
    return this.formatRouteForFlutter(savedRoute);
  }

  private formatRouteForFlutter(route: Route): RouteFormattedDto {
    const sortedDeliveries =
      route.deliveries?.sort(
        (a, b) => (a.routeOrder || 0) - (b.routeOrder || 0),
      ) || [];

    const orders: OrderFormattedDto[] = sortedDeliveries.map((delivery) => ({
      id: delivery.order.id,
      clientName: delivery.order.clientName,
      clientPhone: delivery.order.clientPhone,
      deliveryLocation: {
        latitude: Number(delivery.order.deliveryLatitude),
        longitude: Number(delivery.order.deliveryLongitude),
      },
      address: delivery.order.address,
      items:
        delivery.order.items?.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: Number(item.unitPrice),
        })) || [],
      status: delivery.order.status,
      paymentMethod: delivery.order.paymentMethod,
      createdAt: delivery.order.createdAt,
      deliveryTime: delivery.order.deliveryTime,
      observations: delivery.order.observations || '',
      totalAmount: Number(delivery.order.totalAmount),
    }));

    // Usar string en lugar de enum para evitar comparación unsafe
    const completedOrders = orders.filter(
      (order) => order.status === 'entregado',
    ).length;

    const totalOrders = orders.length;
    const progress = totalOrders > 0 ? completedOrders / totalOrders : 0;

    return {
      id: route.id,
      orders,
      startLocation: {
        latitude: Number(route.startLatitude),
        longitude: Number(route.startLongitude),
      },
      endLocation:
        route.endLatitude && route.endLongitude
          ? {
              latitude: Number(route.endLatitude),
              longitude: Number(route.endLongitude),
            }
          : undefined,
      totalDistance: Number(route.total_distance), // Usar el nombre correcto del campo
      estimatedDuration: route.estimatedDuration || 0,
      optimizationMethod: route.optimizationMethod || 'Manual',
      isOptimized: route.isOptimized || false,
      createdAt: route.createdAt,
      startTime: route.startTime,
      endTime: route.endTime,
      polylinePoints: this.parsePolylinePoints(route.polyline),
      completedOrders,
      totalOrders,
      progress,
    };
  }

  private parsePolylinePoints(polyline?: string): PolylinePoint[] {
    if (!polyline) return [];

    try {
      // Tipar correctamente el resultado del JSON.parse
      const points: unknown = JSON.parse(polyline);

      // Verificar que es un array antes de mapearlo
      if (Array.isArray(points)) {
        return points
          .filter((point): point is PolylinePoint =>
            this.isValidPolylinePoint(point),
          )
          .map((point) => ({
            latitude: Number(point.latitude),
            longitude: Number(point.longitude),
          }));
      }
      return [];
    } catch {
      // Si no es JSON, retornar array vacío
      return [];
    }
  }

  // Type guard para validar puntos de polyline
  private isValidPolylinePoint(point: unknown): point is PolylinePoint {
    return (
      typeof point === 'object' &&
      point !== null &&
      'latitude' in point &&
      'longitude' in point &&
      typeof (point as PolylinePoint).latitude === 'number' &&
      typeof (point as PolylinePoint).longitude === 'number'
    );
  }

  // ===== MÉTODOS EXISTENTES (MANTENER COMPATIBILIDAD) =====

  async findAll(): Promise<Route[]> {
    return await this.routeRepository.find({
      relations: ['deliveries'],
    });
  }

  // Corregir el tipo del parámetro id para que coincida con la entidad
  async findOne(id: number): Promise<Route> {
    const route = await this.routeRepository.findOne({
      where: { id }, // Convertir a string si es necesario
      relations: ['deliveries'],
    });
    if (!route) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }
    return route;
  }

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    // Si se proporciona un ID de entrega, verificar que existe
    if (createRouteDto.deliveryId) {
      const delivery = await this.deliveryService.findOne(
        createRouteDto.deliveryId,
      );

      // Crear la ruta sin el ID de entrega primero
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { deliveryId, ...routeData } = createRouteDto;
      const route = this.routeRepository.create(routeData);

      // Guardar la ruta
      const savedRoute = await this.routeRepository.save(route);

      // Asociar la entrega a la ruta
      delivery.route = savedRoute;
      await this.deliveryRepository.save(delivery);

      return savedRoute;
    } else {
      // Si no hay entrega, crear la ruta normalmente
      const route = this.routeRepository.create(createRouteDto);
      return await this.routeRepository.save(route);
    }
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id);

    Object.assign(route, updateRouteDto);
    return await this.routeRepository.save(route);
  }

  async remove(id: number | string): Promise<void> {
    const result = await this.routeRepository.delete(id.toString());
    if (result.affected === 0) {
      throw new NotFoundException(`Ruta con ID ${id} no encontrada`);
    }
  }

  async findByDate(date: Date): Promise<Route[]> {
    return await this.routeRepository.find({
      where: { date },
      relations: ['deliveries'],
    });
  }
}
