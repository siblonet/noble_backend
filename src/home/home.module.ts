import { Module } from '@nestjs/common';
import { ActivityService } from './home.service';
import { ActivityController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Boutique', schema: ArticleSchema }
    ])
  ],
  
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule { }
