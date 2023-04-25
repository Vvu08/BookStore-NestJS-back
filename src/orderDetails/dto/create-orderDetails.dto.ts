import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1000',
  })
  public orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1000',
  })
  public bookId: number;
}
