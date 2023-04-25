import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateOrderDetailsDto } from './dto/create-orderDetails.dto';

@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Get()
  async getAll() {
    return this.dataSource.query('SELECT * FROM public."OrderDetails"');
  }

  @ApiBody({ type: CreateOrderDetailsDto })
  @Post()
  async create(@Body() body: CreateOrderDetailsDto) {
    const id = Math.floor(Math.random() * 1000000);
    const item = {
      ...body,
      id: id[0],
    };
    await this.dataSource.query(
      `INSERT INTO public."OrderDetails" ("Id", "Quantity", "fk_OrderId", "fk_BookId") VALUES ($1, $2, $3, $4)`,
      [id, item.quantity, item.orderId, item.bookId],
    );
    return item;
  }
}
