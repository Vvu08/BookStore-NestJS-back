import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Genres"');
  }

  @ApiBody({ type: CreateGenreDto })
  @Post()
  async create(@Body() body: CreateGenreDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Genres" ("Id", "Name", "Description") VALUES ($1, $2, $3)`,
      [id, item.name, item.description],
    );
    return item;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Genres" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} has been deleted` };
  }
}
