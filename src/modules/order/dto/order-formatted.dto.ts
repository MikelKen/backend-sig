export class OrderItemFormattedDto {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export class DeliveryLocationDto {
  latitude: number;
  longitude: number;
}

export class OrderFormattedDto {
  id: number;
  clientName: string;
  clientPhone: string;
  deliveryLocation: DeliveryLocationDto;
  address: string;
  items: OrderItemFormattedDto[];
  status: string;
  paymentMethod?: string;
  createdAt: Date;
  deliveryTime?: Date;
  observations?: string;
  totalAmount: number;
}
