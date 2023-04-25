import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'The Kings in the French',
  })
  public title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '250.50',
  })
  public price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '150',
  })
  public unit: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public genreId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public authorId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public supplierId: number;
}
