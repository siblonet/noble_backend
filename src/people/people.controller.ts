import { Controller, Post, Body, Patch, Param, Delete, Get, Put } from '@nestjs/common';
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

  @Put('personupdate/:id')
  PersonUpte(@Param('id') id: string, @Body() persona: Person) {
    return this.peopleService.PersonUpte(id, persona);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: Person) {
    return this.peopleService.update(+id, updatePersonDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }


  @Get("persons")
  async allPersons(): Promise<Person[]> {
    return await this.peopleService.allPerson();
  }
}
