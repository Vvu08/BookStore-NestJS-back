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
import { CreateSupplierDto } from './dto/create-supplier.dto';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Suppliers"');
  }

  @ApiBody({ type: CreateSupplierDto })
  @Post()
  async create(@Body() body: CreateSupplierDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Suppliers" ("Id", "Name", "Address", "City", "Country", "PostalCode", "Phone") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        item.name,
        item.address,
        item.city,
        item.country,
        item.postalCode,
        item.phone,
      ],
    );
    return item;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.dataSource.query(
      `DELETE FROM public."Suppliers" WHERE "Id" = $1`,
      [id],
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return { message: `Item with id ${id} has been deleted` };
  }
}
