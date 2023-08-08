export interface PLog {
    phone: string;
    password: string;
  }
  
  export interface Person {
    _id?: string;
    name: string;
    lastname: string;
    phone: string;
    mail: string;
    password: string;
    admin?: boolean;
  }
  