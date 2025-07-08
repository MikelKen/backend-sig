import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeliveryDto {
  @IsOptional()
  @IsString()
  comment?: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  order_delivery: number;

  @IsOptional()
  @IsString()
  state?: string = 'pendiente';

  @IsOptional()
  @IsString()
  location_delivery?: string;

  @IsOptional()
  @IsDateString()
  actual_delivery_date?: Date;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sequence?: number;
}
