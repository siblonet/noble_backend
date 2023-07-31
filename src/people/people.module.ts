import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MineindService } from 'src/mineind/mineind.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './dto/create-person.dto';
import { LicenceDefSchema } from './dto/licence.schema';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityModule } from 'src/activity/activity.module';
import { ActivitySchema, ActivityrepSchema, CompteSchema, LicenacSchema, DefdaarSchema } from 'src/activity/dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'People', schema: PersonSchema}, 
      { name: 'Licence', schema: LicenceDefSchema},
      { name: 'Activity', schema: ActivitySchema},
      { name: 'ActivityRep', schema: ActivityrepSchema},
      { name: 'Compte', schema: CompteSchema},
    { name: 'Licenac', schema: LicenacSchema},
    { name: 'Defdaara', schema: DefdaarSchema}
  ])],
  controllers: [PeopleController],
  providers: [PeopleService, MineindService, ActivityService]
})
export class PeopleModule {}
