import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './dto/create-person.dto';
import { ActivityService } from 'src/activity/activity.service';
import { ActivitySchema, ActivityrepSchema, CompteSchema } from 'src/activity/dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'People', schema: PersonSchema}, 
      { name: 'Activity', schema: ActivitySchema},
      { name: 'ActivityRep', schema: ActivityrepSchema},
      { name: 'Compte', schema: CompteSchema},

  ])],
  controllers: [PeopleController],
  providers: [PeopleService, MineindService, ActivityService]
})
export class PeopleModule {}
