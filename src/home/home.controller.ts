import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';
import axios from 'axios';
import * as fs from 'fs';

const credentialsPath = './cloudstore.json'; // Adjust the path accordingly

const downloadCredentialsFile = async () => {
  try {
    const response = await axios.get('https://storage.googleapis.com/seeme-7a462.appspot.com/cloudstore.json');
    fs.writeFileSync(credentialsPath, JSON.stringify(response.data));
  } catch (error) {
    throw new Error('Error downloading credentials file');
  }
};



async function checkIfFileExists(filePath: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err); // If no error, the file exists
    });
  });
}


@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService) { }


  async checkFileExists(): Promise<{ exists: boolean }> {
    const exists = await checkIfFileExists(credentialsPath);
    return { exists };
  }


  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
    const deer = await this.checkFileExists();

    if (!deer.exists) {
      downloadCredentialsFile();
      return await this.activityService.createImageWithDelay(base64Data);
    } else {
      return await this.activityService.createImage(base64Data);
    }
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

