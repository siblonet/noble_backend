import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicenceDef } from './entities/licence';
import { Person, PLog } from './entities/person.entity';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() persondto: Person) {
    return this.peopleService.create(persondto);
  }

  @Post('login')
  async login(@Body() pLog: PLog) {
    const user = await this.peopleService.login(pLog);

    return user
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: Person) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }



  @Post("one/licence")
  async defDaarCreate(@Body() licenceDTO: LicenceDef) {
    return await this.peopleService.defDaarCreate(licenceDTO);
  }



  //getting all lisence
  @Post("all/licence")
  async defDaarfetchAll(@Body() {}): Promise<LicenceDef[]> {
    return await this.peopleService.defDaarfetchAll();
  }


  

    // DefDaar licence cheking
    @Post("two/validating")
    async defDaar(@Body() licenceDTO: LicenceDef) {
      return await this.peopleService.defDaar(licenceDTO);
  
    }
}
