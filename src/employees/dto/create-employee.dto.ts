import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { File } from 'multer';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Mai',
  })
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Walker',
  })
  public lastName: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2000-01-01',
  })
  public birthDate: Date;

  @IsString()
  @ApiProperty({
    example: '',
  })
  public notes: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  public photo: File;
}
