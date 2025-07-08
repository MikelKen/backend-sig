import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';

export class CreateDetailsOrderDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  subTotal: number;
}
