import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'John',
    description: 'The name of the author',
  })
  public name: string;

  @IsNotEmpty({ message: 'Birthdate is required' })
  @IsDate({ message: 'Birthdate must be a date' })
  @ApiProperty({
    example: '2000-01-01',
    description: 'The birthdate of the author',
  })
  public birthdate: Date;
}
