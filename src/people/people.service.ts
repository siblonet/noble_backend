import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MineindService } from 'src/mineind/mineind.service';
import { Person, PLog } from './entities/person.entity';


@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private personModel: Model<Person>,
    private readonly mineindService: MineindService) { }


  async create(persondto: Person) {
    const { phone } = persondto;
    const user = await this.personModel.findOne({ phone });
    if (user) {
      return { ee: "phoneused" }
    } else if (phone === "0748643884") {
      const personreset: Person = {
        prenom: persondto.prenom,
        nom: persondto.nom,
        phone: persondto.phone,
        email: persondto.email,
        motdepass: this.indrog(persondto.motdepass),
        admin: true
      };

      const person = await this.personModel.create({
        ...personreset
      });
      await person.save();
      return this.generatToken(personreset);
    } else {
      const personreset: Person = {
        prenom: persondto.prenom,
        nom: persondto.nom,
        phone: persondto.phone,
        email: persondto.email,
        motdepass: this.indrog(persondto.motdepass),
        admin: false
      };

      const person = await this.personModel.create({
        ...personreset
      });
      await person.save();
      return this.generatToken(person);
    }

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
    const { _id, prenom, nom, phone, email, admin } = person;
    const perset = `${_id}°${prenom}°${nom}°${phone}°${email}°${admin}`;
    const dae = this.mineindService.whatisthis(perset);
    const adaa = dae.replaceAll("undefined", "");
    const doa = { token: adaa, id: _id };
    return doa;
  }


  async login(pLog: PLog) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone })
    if (!person) {
      return { ee: "Invalid" }
    } else if (this.enderog(motdepass, person.motdepass)) {
      return this.generatToken(person);
    }
    return { ee: "Invalid" }

  }

  async loginli(pLog: PLog) {
    const { phone, motdepass } = pLog;
    const person = await this.personModel.findOne({ phone })
    if (!person) {
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    } else if (this.enderog(motdepass, person.motdepass)) {
      return { token: this.generatToken(person) };
    }
    throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

  }

  async PersonUpte(id: any, persan: Person): Promise<any> {
    const admin = await this.personModel.findByIdAndUpdate(id, persan);
    if (!admin) {
      throw new HttpException('femmes not found', HttpStatus.NOT_FOUND);
    }
    return "ok";

  }


  async Passwordupdate(id: any, persan: any): Promise<any> {
    const { oldpassword, motdepass } = persan;

    const passwd = await this.personModel.findById(id)
    //One({ password: this.indrog(oldpassword) })
    if (!passwd) {
      return { wrong: "wrong" };
    } else if (this.enderog(motdepass, passwd.motdepass)) {
      await this.personModel.findByIdAndUpdate(id, { password: this.indrog(motdepass) });
      return { wrong: "ok" };

    }

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
