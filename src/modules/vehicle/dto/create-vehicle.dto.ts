// create-vehicle.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsNumber()
  capacityKg: number;

  @IsString()
  @IsNotEmpty()
  nroPlate: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  dealerId: number;
}
