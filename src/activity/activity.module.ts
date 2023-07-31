import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityrepSchema, ActivitySchema, CompteSchema, DefdaarSchema, LicenacSchema } from './dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Activity', schema: ActivitySchema},
      { name: 'ActivityRep', schema: ActivityrepSchema},
      { name: 'Compte', schema: CompteSchema},
    { name: 'Licenac', schema: LicenacSchema},
    { name: 'Defdaara', schema: DefdaarSchema}]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
