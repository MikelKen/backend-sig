import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRouteDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsNotEmpty()
  hour_end: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  delivery_quantity: number;

  @IsString()
  @IsNotEmpty()
  hour_start: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  total_distance: number;

  @IsOptional()
  @IsString()
  polyline?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  deliveryId?: number;
}
