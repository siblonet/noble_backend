import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';
import * as fs from 'fs';
import { MineindService } from 'src/mineind/mineind.service';

const credentialsPath = './cloudstore.json'; // Adjust the path accordingly

async function checkIfFileExists(filePath: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err); // If no error, the file exists
    });
  });
}

@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService,
    private readonly mineindService: MineindService) { }

  async checkFileExists(): Promise<{ exists: boolean }> {
    const exists = await checkIfFileExists(credentialsPath);
    return { exists };
  }

  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
    const exists = await checkIfFileExists(credentialsPath);

    // Define the content you want to write to the credentials file


    if (!exists) {
      // Write the content to the credentials file if it doesn't exist
      fs.writeFileSync(credentialsPath, this.mineindService.credentialReform());
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

