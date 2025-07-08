import { OrderFormattedDto } from '../../order/dto/order-formatted.dto';
import { PolylinePointDto } from './create-route-flutter.dto';

export class LocationDto {
  latitude: number;
  longitude: number;
}

export class RouteFormattedDto {
  id: number;
  orders: OrderFormattedDto[];
  startLocation: LocationDto;
  endLocation?: LocationDto;
  totalDistance: number;
  estimatedDuration: number;
  optimizationMethod: string;
  isOptimized: boolean;
  createdAt: Date;
  startTime?: Date;
  endTime?: Date;
  polylinePoints: PolylinePointDto[];
  completedOrders: number;
  totalOrders: number;
  progress: number;
}
