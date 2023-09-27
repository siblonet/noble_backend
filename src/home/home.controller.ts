import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './home.service';
import { Article } from './entities/activity.entity';

@Controller('boutique')
export class ActivityController {

  constructor(private activityService: ActivityService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() article: Article) {
    return this.activityService.create(article);
  }

  @Get()
  async allArticles(): Promise<Article[]> {
    return await this.activityService.allArticles();
  }


  @Put('/:id')
  PersonUpte(@Param('id') id: string, @Body() activle: Article) {
    return this.activityService.updateArticles(id, activle);
  }

  @Delete('/:id')
  removeArticle(@Param('id') id: string) {
    return this.activityService.removeArticle(id);
  }

}
