import { Module } from '@nestjs/common';
import { ActivityService } from './home.service';
import { ActivityController } from './home.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './dto/create-activity.dto';
import { MineindService } from 'src/mineind/mineind.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Boutique', schema: ArticleSchema }
    ])
  ],
  
  controllers: [ActivityController],
  providers: [ActivityService, MineindService]
})
export class ActivityModule { }
