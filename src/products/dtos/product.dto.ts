import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dto';

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
  @IsMongoId()
  readonly brand: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNotEmpty()
  @ValidateNested()
  readonly create: CreateCategoryDto;
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
