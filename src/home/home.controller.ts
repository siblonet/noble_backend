import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Article } from './entities/activity.entity';
import { ActivityService } from './home.service';


@Controller('boutique')
export class ActivityController {
  constructor(private activityService: ActivityService) { }
  /*
  @Post()
  create(@Body() article: Article) {
    return this.activityService.create(article);
  }*/

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
/*
  @Post('deleteim')
  async deleteImage(@Body() emages: any): Promise<string> {
    this.activityService.deleteImage(emages);
    return "deleted";
  }*/
}

