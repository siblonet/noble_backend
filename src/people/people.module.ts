import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './dto/create-person.dto';
import { ActivityService } from 'src/home/home.service';
import { ArticleSchema } from 'src/home/dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'People', schema: PersonSchema}, 
      { name: 'Boutique', schema: ArticleSchema},
  ])
],
  controllers: [PeopleController],
  providers: [PeopleService, MineindService, ActivityService]
})
export class PeopleModule {}
