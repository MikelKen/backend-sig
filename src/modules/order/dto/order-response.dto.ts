import { OrderStatus } from '../entities/order.entity';

export class LatLng {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class OrderItemResponse {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export class OrderResponse {
  id: string;
  clientName: string;
  clientPhone: string;
  deliveryLocation: LatLng;
  address: string;
  items: OrderItemResponse[];
  status: OrderStatus;
  createdAt: Date;
  totalAmount: number;
}
