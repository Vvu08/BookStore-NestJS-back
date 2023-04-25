import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Authors"');
  }

  @ApiBody({ type: CreateAuthorDto })
  @Post()
  async create(@Body() body: CreateAuthorDto) {
    const id = Math.floor(Math.random() * 1000000);
    const author = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Authors" ("Id", "Name", "BirthDate") VALUES ($1, $2, $3)`,
      [id, author.name, author.birthdate],
    );
    return author;
  }

  @ApiBody({ type: UpdateAuthorDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateAuthorDto) {
    const { name, birthdate } = body;
    await this.dataSource.query(
      `UPDATE public."Authors" SET "Name"=$1, "BirthDate"=$2 WHERE "Id"=$3`,
      [name, birthdate, id],
    );
    return { id, name, birthdate };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Authors" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return { message: `Author with id ${id} has been deleted` };
  }
}
