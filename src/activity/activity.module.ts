import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityrepSchema, ActivitySchema, CompteSchema } from './dto/create-activity.dto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Activity', schema: ActivitySchema},
      { name: 'Compte', schema: CompteSchema},
      { name: 'ActivityRep', schema: ActivityrepSchema}]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
