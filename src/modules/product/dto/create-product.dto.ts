import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  active: boolean;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
