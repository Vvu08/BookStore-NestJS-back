import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'Alphabet',
    description: 'The name of supplier',
  })
  public name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @ApiProperty({
    example: 'Neocooke, 1',
    description: 'The name and number of supplier address',
  })
  public address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  @ApiProperty({
    example: 'Kyiv',
    description: 'The name of supplier city',
  })
  public city: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country must be a string' })
  @ApiProperty({
    example: 'Ukraine',
    description: 'The name of supplier country',
  })
  public country: string;

  @IsNotEmpty({ message: 'Postal code is required' })
  @IsNumber()
  @ApiProperty({
    example: '0106',
    description: 'The postal code of supplier',
  })
  public postalCode: number;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsNumber()
  @ApiProperty({
    example: '0123456789',
    description: 'The phone number of supplier',
  })
  public phone: number;
}
