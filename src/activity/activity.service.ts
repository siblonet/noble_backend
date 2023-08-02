import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityRep, Compte } from './entities/activity.entity';

function getFullDateAndTime(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



@Injectable()
export class ActivityService {

  constructor(
    @InjectModel('Activity') private activityModel: Model<Activity>,
    @InjectModel('ActivityRep') private activityrepModel: Model<ActivityRep>,
    @InjectModel('Compte') private compteModel: Model<Compte>) { }





  async geneRate(): Promise<boolean> {
    const activity = await this.activityModel.create({
      ...{}
    });
    await activity.save();


    const activityrep = await this.activityrepModel.create({
      ...{}
    });
    await activityrep.save();

    const compte = await this.compteModel.create({
      ...{}
    });
    await compte.save();

    return true;
  }



  async findAll(): Promise<any> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("get all activitys requested at : ", fullDateAndTime);
    return await this.activityModel.findOne();

  }


  async findAllrep(): Promise<any> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("get all activityrep requested at : ", fullDateAndTime);
    return await this.activityrepModel.findOne();

  }

  async findAllc(): Promise<any> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("get all  account requested at : ", fullDateAndTime);
    return await this.compteModel.findOne();

  }


  async increaseSome(what: string): Promise<Boolean> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("increase  acttivity  requested at : ", fullDateAndTime);

    switch (what) {
      case "lundi":
        await this.activityModel.updateOne(
          {
            $inc: {
              lundi: + 1
            }
          });
        return true
      case "mardi":
        await this.activityModel.updateOne({ $inc: { mardi: + 1 } });
        return true

      case "mercredi":
        await this.activityModel.updateOne({ $inc: { mercredi: + 1 } });
        return true

      case "jeudi":
        await this.activityModel.updateOne({ $inc: { jeudi: + 1 } });
        return true
      //////////
      case "vendredi":
        await this.activityModel.updateOne({ $inc: { vendredi: + 1 } });
        return true
      /////
      case "samedi":
        await this.activityModel.updateOne({ $inc: { samedi: + 1 } });
        return true
      ////
      case "dimanche":
        await this.activityModel.updateOne({ $inc: { dimanche: + 1 } });
        return true
      default:
        return false
    }
  }

  async increaseSomerep(what: string): Promise<Boolean> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("increase activityRep  requested at : ", fullDateAndTime);

    switch (what) {
      case "lundi":
        await this.activityrepModel.updateOne(
          {
            $inc: {
              lundi: + 1
            }
          });
        return true
      case "mardi":
        await this.activityrepModel.updateOne({ $inc: { mardi: + 1 } });
        return true

      case "mercredi":
        await this.activityrepModel.updateOne({ $inc: { mercredi: + 1 } });
        return true

      case "jeudi":
        await this.activityrepModel.updateOne({ $inc: { jeudi: + 1 } });
        return true
      //////////
      case "vendredi":
        await this.activityrepModel.updateOne({ $inc: { vendredi: + 1 } });
        return true
      /////
      case "samedi":
        await this.activityrepModel.updateOne({ $inc: { samedi: + 1 } });
        return true
      ////
      case "dimanche":
        await this.activityrepModel.updateOne({ $inc: { dimanche: + 1 } });
        return true
      default:
        return false
    }
  }




  async increaseCompte(what: string): Promise<Boolean> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("increase compte  requested at : ", fullDateAndTime);
    switch (what) {
      case "lundi":
        await this.compteModel.updateOne(
          {
            $inc: {
              lundi: + 1
            }
          });
        return true
      case "mardi":
        await this.compteModel.updateOne({ $inc: { mardi: + 1 } });
        return true

      case "mercredi":
        await this.compteModel.updateOne({ $inc: { mercredi: + 1 } });
        return true

      case "jeudi":
        await this.compteModel.updateOne({ $inc: { jeudi: + 1 } });
        return true
      //////////
      case "vendredi":
        await this.compteModel.updateOne({ $inc: { vendredi: + 1 } });
        return true
      /////
      case "samedi":
        await this.compteModel.updateOne({ $inc: { samedi: + 1 } });
        return true
      ////
      case "dimanche":
        await this.compteModel.updateOne({ $inc: { dimanche: + 1 } });
        return true
      ////
      default:
        return false
    }
  }



  decreaseSome(activity: string): void {
    const fullDateAndTime = getFullDateAndTime();
    console.log("decresase activi  requested at : ", fullDateAndTime);
    const activi = this.activityModel.findOne({ activity });
    if (activi) {
      activi.updateOne(
        {
          $inc: {
            what: - 1
          }
        },
        { new: false });
    } else {
      throw new HttpException('il exist pas une activité de ce nom', HttpStatus.UNAUTHORIZED);

    }

  }

  async delete(id: string): Promise<Activity> {
    const fullDateAndTime = getFullDateAndTime();
    console.log("delecte activi  requested at : ", fullDateAndTime);
    return await this.activityModel.findByIdAndRemove(id);
  }

}

