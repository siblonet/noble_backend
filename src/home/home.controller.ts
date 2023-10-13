import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';

@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService) { }

  @Post('uploadImage')
  async createImage(@Body() base64Data: any): Promise<{ ima: String }> {
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

