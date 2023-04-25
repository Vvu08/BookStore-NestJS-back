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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('books')
@Controller('items')
export class ItemsController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Books"');
  }

  @ApiBody({ type: CreateItemDto })
  @Post()
  async create(@Body() body: CreateItemDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Books" ("Id", "Title", "Price", "Unit", "fk_GenreId", "fk_AuthorId", "fk_SupplierId") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        item.title,
        item.price,
        item.unit,
        item.genreId,
        item.authorId,
        item.supplierId,
      ],
    );
    return item;
  }

  @ApiBody({ type: UpdateItemDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateItemDto) {
    const { title, price, unit, genreId, authorId, supplierId } = body;
    await this.dataSource.query(
      `UPDATE public."Books" SET "Title"=$2, "Price"=$3, "Unit"=$4, "fk_GenreId"=$5, "fk_AuthorId"=$6, "fk_SupplierId"=$7 WHERE "Id"=$1`,
      [id, title, price, unit, genreId, authorId, supplierId],
    );
    return body;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Books" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} has been deleted` };
  }
}
