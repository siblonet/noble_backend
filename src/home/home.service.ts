import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/activity.entity';

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
export class ActivityService {

  constructor(
    @InjectModel('Boutique') private boutiqueModel: Model<Article>) { }

  async create(acrticle: Article) {
    const articl = await this.boutiqueModel.create({
      ...acrticle
    });
    await articl.save();
    return 'done';
  }


  async allArticles(): Promise<Article[]> {
    return await this.boutiqueModel.find();
  }


  async updateArticles(id: string, article: Article): Promise<any> {
    const admin = await this.boutiqueModel.findByIdAndUpdate(id, article);
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
