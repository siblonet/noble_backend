import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {

  constructor(private orderService: OrderService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() article: Order) {
    return this.orderService.create(article);
  }

  @Get()
  async allArticles(): Promise<Order[]> {
    return await this.orderService.allArticles();
  }


  @Put('/:id')
  PersonUpte(@Param('id') id: string, @Body() activle: Order) {
    return this.orderService.updateArticles(id, activle);
  }

  @Delete('/:id')
  removeOrders(@Param('id') id: string) {
    return this.orderService.removeOrders(id);
  }

  @Delete('oarderar/:id/:ad')
  removeOrdersArticl(@Param('id') id: string, @Param('ad') ad: string) {
    return this.orderService.removeOrdersArticl(id, ad);
  }

}
