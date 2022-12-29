import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
}
