import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShipperDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Shipper',
  })
  public name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '0123456789',
  })
  public phone: number;
}
