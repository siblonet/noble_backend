import { Document } from 'mongoose';

export interface Order extends Document {
    articles: [
        {
            arti_id: string
            quantcho: Number;
            image: String;
            color: String;
            size: String;
            statut: string;
            prix: Number
        }
    ];
    ville: string;
    commune: string;
    lieu: string;
    phone: string;
    note: string;
    statut: string;
    client: string;
    created?: Date;
}
