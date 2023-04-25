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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateShipperDto } from './dto/create-shipper.dto';

@ApiTags('shippers')
@Controller('shippers')
export class ShippersController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Shippers"');
  }

  @ApiBody({ type: CreateShipperDto })
  @Post()
  async create(@Body() body: CreateShipperDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Shippers" ("Id", "Name", "Phone") VALUES ($1, $2, $3)`,
      [id, item.name, item.phone],
    );
    return item;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Shippers" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} has been deleted` };
  }
}
