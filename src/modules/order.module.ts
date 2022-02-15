import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/controllers/order/order.controller';
import { Order } from 'src/interfaces/order.entity';
import { OrderService } from 'src/services/order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
