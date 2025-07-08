import {
  IsNumber,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  cliente_id: number;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  deliveryLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  deliveryLongitude: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  totalAmount: number;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: Date;

  @IsOptional()
  @IsBoolean()
  paid?: boolean;
}
