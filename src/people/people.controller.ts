import { Controller, Post, Body, Patch, Param, Delete, Get, Put } from '@nestjs/common';
import { Person, PLog } from './entities/person.entity';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post()
  create(@Body() person: Person) {
    return this.peopleService.create(person);
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

  @Put('status/:id')
  PersonStatus(@Param('id') id: string, @Body() status: any) {
    return this.peopleService.PersonUpte(id, status);
  }

  @Put('passwordupdate/:id')
  Passwordupdate(@Param('id') id: string, @Body() passwor: any) {
    return this.peopleService.Passwordupdate(id, passwor);
  }

  @Put('pushtoken/:id')
  Pushtoken(@Param('id') id: string, @Body() pushtoken: any) {
    return this.peopleService.Pushtoken(id, pushtoken);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }

  @Get("persons")
  async allPersons(): Promise<Person[]> {
    return await this.peopleService.allPerson();
  }


      // Update the existing DELETE route to handle article removal
      @Post('sendexpopushtoken')
      async sendExpopushnotification(@Body() notificaton: any): Promise<void> {
        return this.peopleService.sendExpoPushNotifications(notificaton);
      }


}
