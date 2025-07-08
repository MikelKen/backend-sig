import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRouteDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  hour_end?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  delivery_quantity?: number;

  @IsOptional()
  @IsString()
  hour_start?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  total_distance?: number;

  @IsOptional()
  @IsString()
  polyline?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  deliveryId?: number;
}