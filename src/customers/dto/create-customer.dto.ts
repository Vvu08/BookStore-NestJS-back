import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'Lilly Butler',
  })
  public name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @ApiProperty({
    example: 'Heathvilla, 32',
  })
  public address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @ApiProperty({
    example: 'Kyiv',
  })
  public city: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @ApiProperty({
    example: 'Ukraine',
  })
  public country: string;

  @IsNotEmpty({ message: 'Postal code is required' })
  @IsNumber()
  @ApiProperty({
    example: '0106',
  })
  public postalCode: number;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsNumber()
  @ApiProperty({
    example: '0123456789',
  })
  public phone: number;
}
