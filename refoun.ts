/*import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  
    // Map the image upload operations to an array of promises
    const uploadPromises = article.image.map(async (ee) => {
      const bucket = storage.bucket(this.bucketName);
      const file = bucket.file(`${generatedUuid}${ee.nam}`);  // Concatenate image name and extension
  
      const imageBuffer = Buffer.from(ee.ima, 'base64');
  
      // Upload the buffer to the bucket
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });
  
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}${ee.nam}`;
      imago.push({ ima: publicUrl });
    });
  
    // Wait for all image uploads to complete
    await Promise.all(uploadPromises);
  
    console.log(imago);
  
    article.image = imago;
    await this.boutiqueModel.create(article);
    return 'Article created successfully';
  }
  

  generateUuid(): string {
    return uuidv4(); // Assuming you have imported uuidv4 from the uuid package
  }

  async allArticles(): Promise<Article[]> {
    return await this.boutiqueModel.find();
  }


  async updateArticles(id: string, article: any): Promise<any> {

    const imago = [];
    const generatedUuid = this.generateUuid();

    article.image.forEach((ee: any) => {
      if (ee.status && ee.status === "update") {
        const bucket = storage.bucket(this.bucketName);
        const file = bucket.file(generatedUuid + ee.nam);

        const imageBuffer = Buffer.from(ee.ima, 'base64');

        // Upload the buffer to the bucket
        file.save(imageBuffer, {
          metadata: {
            contentType: 'image/jpeg',
          },
        });

        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${generatedUuid}`;

        imago.push({ ima: publicUrl })
      };
    });


    article.image = imago;

    const admin = await this.boutiqueModel.findByIdAndUpdate(id, article, { new: true });
    if (!admin) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    return "done";
  }


  async removeArticle(id: string) {
    const imads = await this.boutiqueModel.findById(id);

    this.deleteArticleImage(imads.image);

    await this.boutiqueModel.findByIdAndRemove(id);
  }

  deleteArticleImage(imageFileName: any) {
    try {
      imageFileName.forEach((ee: any) => {
        const bucket = storage.bucket(this.bucketName);
        bucket.file(ee.ima).delete();
      })
    } catch (error) {
      throw new Error('Error deleting image from Google Cloud Storage');
    }
  }

  deleteImage(imageFileName: any) {
    console.log(imageFileName.name);
    try {
        const bucket = storage.bucket(this.bucketName);
        bucket.file(imageFileName.name).delete();
    } catch (error) {
      throw new Error('Error deleting image from Google Cloud Storage');
    }
  }




}



import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';


@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService) { }
  
  @Post()
  create(@Body() article: Article) {
    return this.activityService.create(article);
  }

  @Get()
  async allArticles(): Promise<Article[]> {
    return await this.activityService.allArticles();
  }


  @Put('/:id')
  async updateArticle(@Param('id') id: string, @Body() article: any): Promise<Article> {
    return this.activityService.updateArticles(id, article);
  }

   // Update the existing DELETE route to handle article removal
  @Delete('/:id')
  async removeArticle(@Param('id') id: string): Promise<void> {
    return this.activityService.removeArticle(id);
  };

  @Post('deleteim')
  async deleteImage(@Body() emages: any): Promise<string> {
    this.activityService.deleteImage(emages);
    return "deleted";
  
}


*/