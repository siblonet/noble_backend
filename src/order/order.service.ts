import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/home/entities/activity.entity';
import { Order } from './entities/order.entity';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('Boutique') private boutiqueModel: Model<Article>) { }

  async create(acrticle: Order) {
    const articl = await this.orderModel.create({
      ...acrticle
    });
    await articl.save();
    await this.decreaseArticleQuantity(acrticle.articles);
    return { done: 'done' };
  }

  async decreaseArticleQuantity(articles: any[]) {
    try {
      for (const article of articles) {
        await this.boutiqueModel.findByIdAndUpdate(
          article.arti_id,
          { $inc: { quantity: -article.quantcho } },
          { new: true }
        );
      }
    } catch (error) {
      throw new Error(`Failed to decrease article quantities: ${error.message}`);
    }
  }
  
  async increaseArticleQuantity(id: string, quan: Number): Promise<any> {
    try {
      const result = await this.orderModel.findByIdAndUpdate(
        id,
        { $inc: { quantity: +quan } },
        { new: true } // to get the updated document
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to decrease article quantity: ${error.message}`);
    }
  }


  async allArticles(): Promise<Order[]> {
    return await this.orderModel.find().populate('articles.arti_id').populate('client');
  }


  async getmyOrders(id: string): Promise<Order[]> {
    return await this.orderModel.find({ client: id }).populate('articles.arti_id');
  }

  async updateOrder(id: string, od: string, updatedArticle: any): Promise<any> {
    const admin = await this.orderModel.findOneAndUpdate(
      { _id: id, 'articles._id': od },
      {
        $set: {
          'articles.$.quantcho': updatedArticle.quantcho,
          'articles.$.image': updatedArticle.image,
          'articles.$.color': updatedArticle.color,
          'articles.$.size': updatedArticle.size,
          ville: updatedArticle.ville,
          commune: updatedArticle.commune,
          lieu: updatedArticle.lieu,
          phone: updatedArticle.phone,
        },
      },
      { new: true }
    );

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return "done";
  }

  async updateOrderStatus(id: string, od: string, updatedArticle: any): Promise<any> {
    const admin = await this.orderModel.findOneAndUpdate(
      { _id: id, 'articles._id': od },
      {
        $set: {
          'articles.$.statut': updatedArticle.statut
        },
      },
      { new: true }
    );

    if (!admin) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return "done";
  }

  async removeOrders(id: string) {
    await this.orderModel.findByIdAndRemove(id);
    return 'done';
  };

  async removeOrdersArticl(id: string, ad: string, artid: string, quan: Number) {
    await this.orderModel.findByIdAndUpdate(id,
      {
        $pull:
        {
          articles: {
            _id: ad
          }
        }
      },
      { new: true }
    );

    this.increaseArticleQuantity(artid, quan);
    return "done";

  }
}
