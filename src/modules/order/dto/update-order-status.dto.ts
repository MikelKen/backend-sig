// update-order-status.dto.ts
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { Transform } from 'class-transformer';

export enum PaymentMethod {
  EFECTIVO = 'efectivo',
  TRANSFERENCIA = 'transferencia',
  QR = 'qr',
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
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  deliveryTime?: Date;
}
