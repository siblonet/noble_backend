import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityService } from 'src/activity/activity.service';
import { MineindService } from 'src/mineind/mineind.service';
import { Person, PLog } from './entities/person.entity';


@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private personModel: Model<Person>,
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


  async allPerson(): Promise<Person[]> {
    return await this.personModel.find();

  }
}
