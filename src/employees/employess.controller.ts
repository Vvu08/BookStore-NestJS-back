import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { File } from 'multer';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/utils/storage';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Employees"');
  }

  @ApiBody({ type: CreateEmployeeDto })
  @UseInterceptors(FileInterceptor('photo', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@UploadedFile() photo: File, @Body() body: CreateEmployeeDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Employees" ("Id", "FirstName", "LastName", "BirthDate", "Notes", "Photo") VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, item.firstName, item.lastName, item.birthDate, item.notes, photo],
    );
    return { ...item, photo };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Employees" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} has been deleted` };
  }
}
