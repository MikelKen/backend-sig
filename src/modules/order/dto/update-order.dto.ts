import { IsNumber, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cliente_id?: number;

  @IsOptional()
  @IsDateString()
  dateOrder?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  total?: number;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  ubication?: string;

  @IsOptional()
  @IsDateString()
  estimatedDeliveryDate?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  paid?: boolean;
}