import { Document } from 'mongoose';

export interface Article extends Document {
    addarticle: string;
    addprixpro: number;
    addprix: number;
    addfour: string;
    adddispo: string;
    addcoul: string;
    addtail: string;
    addmateri: string;
    addtype: string;
    addphone: string;
    quantity: string;
    addexpe: string;
    who: string;
    notes: string;
    image: [{ima: string}];
    created?: Date;
}
