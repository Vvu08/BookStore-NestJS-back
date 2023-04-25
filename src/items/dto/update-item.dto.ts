import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'The Kings in the French',
  })
  public title: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '250.50',
  })
  public price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '150',
  })
  public unit: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public genreId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public authorId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public supplierId: number;
}
