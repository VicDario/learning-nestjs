import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;
}

export class UpdateProductDto extends PartialType(ProductDto) {}
