import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './dto/create-order.dto';
import { ArticleSchema } from 'src/home/dto/create-activity.dto';
import { PersonSchema } from 'src/people/dto/create-person.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Boutique', schema: ArticleSchema },
      { name: 'People', schema: PersonSchema }
    ])
  ],

  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
