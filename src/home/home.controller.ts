import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { Storage } from '@google-cloud/storage';
import { ActivityService } from './home.service';
import * as path from 'path'; // Import the 'path' module to handle file paths


const credentialsPath = "https://storage.googleapis.com/seeme-7a462.appspot.com/cloudstore.json"; // Adjust the path accordingly
const storage = new Storage({
  keyFilename: credentialsPath,
});

@Controller('boutique')
export class ActivityController {
  private bucketName = 'seeme-7a462.appspot.com'; // Replace with your actual Google Cloud Storage bucket name
  constructor(private activityService: ActivityService) { }
  
  @Post('uploadImage')
  async uploadImage(@Body() { base64Data, fileName }): Promise<string> {
    const bucket = storage.bucket(this.bucketName);
    const file = bucket.file(fileName);

    // Convert base64 data to a buffer
    const imageBuffer = Buffer.from(base64Data, 'base64');

    try {
      // Upload the buffer to the bucket
      await file.save(imageBuffer, {
        metadata: {
          contentType: 'image/jpeg', // Adjust the content type based on your file type
        },
      });

      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`;

      console.log(publicUrl);

      return publicUrl; //
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }
  }




  @Post()
  create(@Body() article: Article) {
    return this.activityService.create(article);
  }

  @Get()
  async allArticles(): Promise<Article[]> {
    return await this.activityService.allArticles();
  }
  // Update the existing PUT route to handle article update
  @Put('/:id')
  async updateArticle(@Param('id') id: string, @Body() article: Article): Promise<Article> {
    return this.activityService.updateArticles(id, article);
  }

  // Update the existing DELETE route to handle article removal
  @Delete('/:id')
  async removeArticle(@Param('id') id: string): Promise<void> {
    return this.activityService.removeArticle(id);
  }
}

