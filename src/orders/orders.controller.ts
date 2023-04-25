import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."Orders"');
  }

  @ApiBody({ type: CreateOrderDto })
  @Post()
  async create(@Body() body: CreateOrderDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."Orders" ("Id", "Date", "fk_CustomerId", "fk_EmployeeId", "fk_ShipperId") VALUES ($1, $2, $3, $4, $5)`,
      [id, item.date, item.customerId, item.employeeId, item.shipperId],
    );
    return item;
  }
}
