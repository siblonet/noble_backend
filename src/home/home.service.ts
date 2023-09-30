import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/activity.entity';
//import ArticleSchema from './path_to_article_schema'; // Adjust the import path
//import { ArticleSchema } from './dto/create-activity.dto';


@Injectable()
export class ActivityService {
  constructor(@InjectModel('Boutique') private boutiqueModel: Model<Article>) { }

  async create(article: Article): Promise<string> {
    await this.boutiqueModel.create(article);
    return 'Article created successfully';
  }

  async allArticles(): Promise<Article[]> {
    return await this.boutiqueModel.find();
  }


  async updateArticles(id: string, article: Article): Promise<any> {
    const admin = await this.boutiqueModel.findByIdAndUpdate(id, article, { new: true });
    if (!admin) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    return "done";
  }


  async removeArticle(id: string) {
    await this.boutiqueModel.findByIdAndRemove(id);
    return 'done';
  }
}
