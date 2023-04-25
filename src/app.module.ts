import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './items/items.controller';
import { AuthorsController } from './authors/authors.controller';
import { GenresController } from './genres/genres.controller';
import { SuppliersController } from './suppliers/suppliers.controller';
import { ShippersController } from './shippers/shippers.controller';
import { EmployeesController } from './employees/employess.controller';
import { CustomersController } from './customers/customers.controller';
import { OrdersController } from './orders/orders.controller';
import { OrderDetailsController } from './orderDetails/orderDetails.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
    }),
  ],
  controllers: [
    OrderDetailsController,
    OrdersController,
    ItemsController,
    AuthorsController,
    GenresController,
    SuppliersController,
    ShippersController,
    EmployeesController,
    CustomersController,
  ],
})
export class AppModule {}
