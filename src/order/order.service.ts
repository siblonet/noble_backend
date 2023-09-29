import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>) { }

  async create(acrticle: Order) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    return { done: 'done' };
  }


  async allArticles(): Promise<Order[]> {
    return await this.orderModel.find().populate('articles.arti_id').populate('client');
  }


  async updateArticles(id: string, article: Order): Promise<any> {
    const admin = await this.orderModel.findByIdAndUpdate(id, article);
    if (!admin) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    return "done";
  }


  async removeOrders(id: string) {
    await this.orderModel.findByIdAndRemove(id);
    return 'done';
  };

  async removeOrdersArticl(id: string, ad: string) {
    await this.orderModel.findByIdAndUpdate(id,
      {
        $pull:
        {
          articles: {
            _id: ad
          }
        }
      },
      {new: true}
    );
    return 'done';
  }
}
