// create-route-flutter.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PolylinePointDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

export class CreateRouteFlutterDto {
  @IsOptional()
  @IsString() // Cambiar a string si tu entidad Route usa UUID string
  id?: number;

  @IsArray()
  @IsString({ each: true }) // Cambiar de IsUUID a IsString para mayor flexibilidad
  orderIds: number[]; // IDs de las órdenes en la ruta

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startLatitude: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  startLongitude: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endLatitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  endLongitude?: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  totalDistance: number; // Este se mapea a total_distance en la entidad

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  estimatedDuration: number; // en minutos

  @IsOptional()
  @IsString()
  optimizationMethod?: string;

  @IsOptional()
  @IsString()
  polyline?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PolylinePointDto)
  polylinePoints?: PolylinePointDto[];

  @IsOptional()
  @IsBoolean()
  isOptimized?: boolean;
}
