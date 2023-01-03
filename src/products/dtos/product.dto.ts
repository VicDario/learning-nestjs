import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;


  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;
}

export class UpdateProductDto extends PartialType(ProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsNumber()
  @IsPositive()
  maxPrice: number;
}
