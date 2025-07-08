// update-order-status.dto.ts
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export enum PaymentMethod {
  EFECTIVO = 'efectivo',
  TARJETA_CREDITO = 'tarjeta_credito',
  TRANSFERENCIA = 'transferencia',
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsDateString()
  deliveryTime?: Date;
}
