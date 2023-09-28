import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';

function getFullDateAndTime(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

@Injectable()
export class OrderService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>) { }

  async create(acrticle: Order) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    return 'done';
  }


  async allArticles(): Promise<Order[]> {
    return await this.orderModel.find();
  }


  async updateArticles(id: string, article: Order): Promise<any> {
    const admin = await this.orderModel.findByIdAndUpdate(id, article);
    if (!admin) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    return "done";
  }


  async removeArticle(id: string) {
    await this.orderModel.findByIdAndRemove(id);
    return 'done';
  }
}
