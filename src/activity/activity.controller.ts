import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity, ActivityRep } from './entities/activity.entity';

@Controller('activity')
export class ActivityController {

  constructor(private activityService: ActivityService) { }

  @Post()
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  async create(): Promise<boolean> {
    return await this.activityService.geneRate();
  }

  @Get()
  async listAll(): Promise<Activity> {
    return await this.activityService.findAll();
  }

  @Get("activityrep")
  async findAllrep(): Promise<ActivityRep> {
    return await this.activityService.findAllrep();
  }


  
  @Get("compte")
  async listAllc(): Promise<Activity> {
    return await this.activityService.findAllc();
  }



  //increasing   
  @Put(`activity/:id`)
  async increaseActivity(@Param("id") id: string): Promise<any> {
    return await this.activityService.increaseSome(id);
  }

    //increasing   
    @Put(`activityrep/:id`)
    async increaseSomerep(@Param("id") id: string): Promise<any> {
      return await this.activityService.increaseSomerep(id);
    }



  //increasing   
  @Put(`tree/five/one/compte/:id`)
  async increaseCompte(@Param("id") id: string): Promise<any> {
    return await this.activityService.increaseCompte(id);
  }

  //decreasing    
  @Put(`one/:activity/:id`)
  async decreaseActivity(@Param("id") id: string): Promise<any> {
    this.activityService.decreaseSome(id);
    return true
  }


  @Delete(':id')
  //@UseGuards(AuthGuard('jwt'), AdminGuard)
  async delete(@Param('id') id: string): Promise<Activity> {
    return await this.activityService.delete(id);
  }
}
