import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'John',
    description: 'The name of the author',
  })
  public name: string;

  @IsOptional()
  @IsDate({ message: 'Birthdate must be a date' })
  @ApiProperty({
    example: '2000-01-01',
    description: 'The birthdate of the author',
  })
  public birthdate: Date;
}
