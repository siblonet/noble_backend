export interface PLog {
    phone: string;
    motdepass: string;
  }
  
  export interface Person {
    _id?: string;
    prenom: string;
    nom: string;
    phone: string;
    email: string;
    motdepass: string;
    admin?: string;
    commade?: string;
  }
