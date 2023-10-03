import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/activity.entity';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';

const credentialsPath = './cloudstore.json'; // Adjust the path accordingly

const storage = new Storage({
  keyFilename: credentialsPath,
});


@Injectable()
export class ActivityService {
  private bucketName = 'seeme-7a462.appspot.com';
  constructor(@InjectModel('Boutique') private boutiqueModel: Model<Article>) { }

  async createImage(imagefolder: any): Promise<{ ima: String }> {

    const generatedUuid = this.generateUuid() + imagefolder.nam;

    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(generatedUuid);
    const imageBuffer = Buffer.from(imagefolder.ima, 'base64');

    file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;
    return { ima: publicUrl }
  }

  async createImageWithDelay(imagefolder: any): Promise<{ ima: String }> {
    let imo;

    const generatedUuid = this.generateUuid() + imagefolder.nam;

    setTimeout(() => {
      const bucket = storage.bucket(this.bucketName);
      const file = bucket.file(generatedUuid);
      const imageBuffer = Buffer.from(imagefolder.ima, 'base64');
  
      file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });
  
      imo = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;
    }, 5000);

    return { ima: imo }
  }

  async create(article: Article): Promise<Article> {
    return await this.boutiqueModel.create(article);
  }




  generateUuid(): string {
    return uuidv4();
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
  }
}
