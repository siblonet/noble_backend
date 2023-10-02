import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './entities/activity.entity';
import axios from 'axios';
import * as fs from 'fs';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

// Use the generated UUID in your NestJS application as needed

const credentialsPath = './cloudstore.json'; // Adjust the path accordingly

const downloadCredentialsFile = async () => {
  try {
    const response = await axios.get('https://storage.googleapis.com/seeme-7a462.appspot.com/cloudstore.json');
    fs.writeFileSync(credentialsPath, JSON.stringify(response.data));
  } catch (error) {
    throw new Error('Error downloading credentials file');
  }
};

downloadCredentialsFile();

const storage = new Storage({
  keyFilename: credentialsPath,
});

@Injectable()
export class ActivityService {
  private bucketName = 'seeme-7a462.appspot.com';
  constructor(@InjectModel('Boutique') private boutiqueModel: Model<Article>) { }




  async create(article: any): Promise<string> {
    const imago = [];
    const generatedUuid = this.generateUuid();


    const bucket = storage.bucket(this.bucketName);
    //console.log(article.image[0].nam);
    const file = bucket.file(generatedUuid + article.image[0].nam);

    const imageBuffer = Buffer.from(article.image[0].ima, 'base64');

    file.save(imageBuffer, {
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid + article.image[0].nam}`;
    //console.log(publicUrl);

    /*
        article.image.forEach(ee => {
          const bucket = storage.bucket(this.bucketName);
          console.log(ee.nam);
          const file = bucket.file(generatedUuid+ee.nam);
    
          const imageBuffer = Buffer.from(ee.ima, 'base64');
      
            // Upload the buffer to the bucket
            file.save(imageBuffer, {
              metadata: {
                contentType: 'image/jpeg',
              },
            });

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid + ee.nam}`;

    imago.push({ ima: publicUrl })
  });

    article.image = imago;
    await this.boutiqueModel.create(article);
    */
    return 'Article created successfully';
  }

  generateUuid(): string {
    return uuidv4(); // Assuming you have imported uuidv4 from the uuid package
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




  async uploadImage(imdata: { fol: any, nam: any }): Promise<string> {
    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(imdata.nam);

    // Convert base64 data to a buffer
    const imageBuffer = Buffer.from(imdata.fol, 'base64');

    try {
      // Upload the buffer to the bucket
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });

      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${imdata.nam}`;

      return publicUrl; //
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }
}
