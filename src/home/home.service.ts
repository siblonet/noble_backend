import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/activity.entity';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@google-cloud/storage';
import * as AWS from 'aws-sdk';
import { MineindService } from 'src/mineind/mineind.service';



@Injectable()
export class ActivityService {
  private bucketName = 'seeme-7a462.appspot.com';
  private awsS3 = new AWS.S3();

  constructor(@InjectModel('Boutique') private boutiqueModel: Model<Article>,
    private readonly mineindService: MineindService) { }

  private async downloadCredentialsFromS3(): Promise<any> {
    const params = { Bucket: this.mineindService.thisiswhat("XBXORX:AZMB:KOFN:YVZI:FH:VZHG:0"), Key: 'cloudstore.json' };
    const result = await this.awsS3.getObject(params).promise();

    // Assuming credentials are stored as a JSON string in S3
    return JSON.parse(result.Body.toString());
  }

  private async initializeGoogleCloudStorage(): Promise<Storage> {
    const credentials = await this.downloadCredentialsFromS3();
    const storage = new Storage({ credentials });
    return storage;
  }

  async createImage(imagefolder: any): Promise<{ ima: string }> {
    const generatedUuid = this.generateUuid() + imagefolder.nam;
    const storage = await this.initializeGoogleCloudStorage();
    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(generatedUuid);
    const imageBuffer = Buffer.from(imagefolder.ima, 'base64');

    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;
    return { ima: publicUrl };
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
