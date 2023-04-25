import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: new Date().toISOString(),
  })
  public date: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public customerId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public employeeId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  public shipperId: number;
}
