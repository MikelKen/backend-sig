import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order_delivery?: number;

  @IsOptional()
  @IsString()
  state?: string;

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