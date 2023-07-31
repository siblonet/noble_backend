import { Injectable } from '@nestjs/common';
//construction 
@Injectable()
export class AppService {
  getHello(): object {
    const fory = {
      "nome":"pablo",
      "lastname":"old pablo",
    }
    return fory;
  }
}
