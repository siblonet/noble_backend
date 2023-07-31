import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Console } from 'console';
import { Model } from 'mongoose';
import { ActivityService } from 'src/activity/activity.service';
import { MineindService } from 'src/mineind/mineind.service';
import { LicenceDef } from './entities/licence';
import { Person, PLog } from './entities/person.entity';


const dae: any = {
  "1": "lundi",
  "2": "mardi",
  "3": "mercredi",
  "4": "jeudi",
  "5": "vendredi",
  "6": "samedi",
  "0": "dimanche"
}


@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private personModel: Model<Person>,
    @InjectModel('Licence') private licenceModel: Model<LicenceDef>,
    private readonly mineindService: MineindService,
    private readonly activityService: ActivityService) { }




  async create(persondto: Person) {
    const { phone } = persondto;
    const user = await this.personModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    }
    const personreset: Person = {
      name: persondto.name,
      lastname: persondto.lastname,
      phone: persondto.phone,
      mail: persondto.mail,
      password: this.indrog(persondto.password),
      admin: persondto.admin
    };

    const person = await this.personModel.create({
      ...personreset
    });
    await person.save();
    return this.generatToken(personreset);

  }

  indrog(dd: any) {
    const dae = this.mineindService.whatisthis(dd)
    const adaa = dae.replaceAll("undefined", "");
    return adaa
  }

  enderog(nez: any, ood: any): Boolean {
    const dae = this.mineindService.thisiswhat(nez)
    const adaa = dae.replaceAll("undefined", "");

    if (adaa === ood)
      return true
    return false
  }

  generatToken(person: Person): Object {
    const { name, lastname, phone, mail, admin } = person;
    const perset = `${name}°${lastname}°${phone}°${mail}°${admin}`
    const dae = this.mineindService.whatisthis(perset)
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa };
    return doa;
  }




  async login(pLog: PLog) {
    const { phone, password } = pLog;
    const person = await this.personModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(password, person.password)) {
      return this.generatToken(person);
    }
    return { ee: "Invalid" }

  }

  async loginli(pLog: PLog) {
    const { phone, password } = pLog;
    const person = await this.personModel.findOne({ phone })
    if (!person) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    } else if (this.enderog(password, person.password)) {
      return {token: this.generatToken(person)};
    }
    throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

  }


  update(id: number, persondto: Person) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }

  // DefDaar licence
  async defDaarCreate(licence: any): Promise<any> {
    const licenceset = {
      Silenceko: licence.Silenceko,
      Silenceka: this.indrog(licence.Silenceka),
      Auteur: licence.Auteur,
      Auteta: licence.Auteta,
      capacity: licence.capacity,
      Licetyp: licence.Licetyp,// free or bouth
      compu: licence.compu,
      logcount: licence.logcount
    };

    const licenc = await this.licenceModel.create({
      ...licenceset
    });
    await licenc.save();
    return licenc;


  }


  // DefDaar licence
  async defDaarfetchAll(): Promise<any> {
    return await this.licenceModel.find();
  }


  async defDaar(licenced: any): Promise<any> {
    const login = await this.loginli(licenced)
    if (login) {
      const da = new Date().getDay();
      const doa = dae[`${da}`];

      const { Silenceka } = licenced;
      const licence = await this.licenceModel.findOne({ Silenceka });

      if (!licence) {

        throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
      }

      if (this.enderog(Silenceka, licence.Silenceko) && licence.logcount <= licence.capacity && licence.Liceeta === "Utilisable") {
        await licence.updateOne(
          {
            $inc: { logcount: + 1, used: + 1 }
          },
          { new: true }
        );

        await this.activityService.increaseDefdaar(doa)
        return {...{Silenceka: licence.Silenceka, ...login.token}};
      } else if (licence.logcount >= licence.capacity) {
        await licence.updateOne({Liceeta: "Complet"});
        throw new HttpException('Reconnecter Vous dans 24h', HttpStatus.TOO_MANY_REQUESTS);
      } else {
        throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
      }

    } else {
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);

    }

  }

}
