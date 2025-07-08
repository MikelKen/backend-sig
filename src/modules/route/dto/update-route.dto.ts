import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PolylinePointDto } from './create-route-flutter.dto';

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

  // Nuevos campos para Flutter
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  estimatedDuration?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startLatitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  startLongitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endLatitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endLongitude?: number;

  @IsOptional()
  @IsString()
  optimizationMethod?: string;

  @IsOptional()
  @IsBoolean()
  isOptimized?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startTime?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PolylinePointDto)
  polylinePoints?: PolylinePointDto[];
}
