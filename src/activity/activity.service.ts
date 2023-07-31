import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityRep, Compte, Defdaar, Licenac } from './entities/activity.entity';

@Injectable()
export class ActivityService {

  constructor(
    @InjectModel('Activity') private activityModel: Model<Activity>,
    @InjectModel('ActivityRep') private activityrepModel: Model<ActivityRep>,
    @InjectModel('Compte') private compteModel: Model<Compte>,
    @InjectModel('Licenac') private licenaModel: Model<Licenac>,
    @InjectModel('Defdaara') private defdaarModel: Model<Defdaar>) { }





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


    const licencea = await this.licenaModel.create({
      ...{}
    });
    await licencea.save();


    const defdaar = await this.defdaarModel.create({
      ...{}
    });
    await defdaar.save();

    return true;
  }



  async findAll(): Promise<any> {
    return await this.activityModel.findOne();

  }


  async findAllrep(): Promise<any> {
    return await this.activityrepModel.findOne();

  }

  async findAllc(): Promise<any> {
    return await this.compteModel.findOne();

  }

  async findAlll(): Promise<any> {
    return await this.licenaModel.findOne();

  }

  async findAlld(): Promise<any> {
    return await this.defdaarModel.findOne();

  }

  async increaseSome(what: string): Promise<Boolean> {
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


  async increaseDefdaar(what: string): Promise<Boolean> {
    switch (what) {
      case "lundi":
        await this.defdaarModel.updateOne(
          {
            $inc: {
              lundi: + 1
            }
          });
        return true
      case "mardi":
        await this.defdaarModel.updateOne({ $inc: { mardi: + 1 } });
        return true

      case "mercredi":
        await this.defdaarModel.updateOne({ $inc: { mercredi: + 1 } });
        return true

      case "jeudi":
        await this.defdaarModel.updateOne({ $inc: { jeudi: + 1 } });
        return true
      //////////
      case "vendredi":
        await this.defdaarModel.updateOne({ $inc: { vendredi: + 1 } });
        return true
      /////
      case "samedi":
        await this.defdaarModel.updateOne({ $inc: { samedi: + 1 } });
        return true
      ////
      case "dimanche":
        await this.defdaarModel.updateOne({ $inc: { dimanche: + 1 } });
        return true
      ////
      default:
        return false
    }
  }



  async increaseLicence(what: string): Promise<Boolean> {
    switch (what) {
      case "lundi":
        await this.licenaModel.updateOne(
          {
            $inc: {
              lundi: + 1
            }
          });
        return true
      case "mardi":
        await this.licenaModel.updateOne({ $inc: { mardi: + 1 } });
        return true

      case "mercredi":
        await this.licenaModel.updateOne({ $inc: { mercredi: + 1 } });
        return true

      case "jeudi":
        await this.licenaModel.updateOne({ $inc: { jeudi: + 1 } });
        return true
      //////////
      case "vendredi":
        await this.licenaModel.updateOne({ $inc: { vendredi: + 1 } });
        return true
      /////
      case "samedi":
        await this.licenaModel.updateOne({ $inc: { samedi: + 1 } });
        return true
      ////
      case "dimanche":
        await this.licenaModel.updateOne({ $inc: { dimanche: + 1 } });
        return true
      ////
      default:
        return false
    }
  }


  async increaseCompte(what: string): Promise<Boolean> {
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
    return await this.activityModel.findByIdAndRemove(id);
  }

}

