import { Document } from 'mongoose';

export interface Activity extends Document {
    lundi: string;
    mardi: number;
    mercredi: number;
    jeudi: number;
    vendredi: number;
    samedi: number;
    dimanche: number;
    created: Date;
}

export interface ActivityRep extends Document {
    lundi: string;
    mardi: number;
    mercredi: number;
    jeudi: number;
    vendredi: number;
    samedi: number;
    dimanche: number;
    created: Date;
}

export interface Compte extends Document {
    lundi: string;
    mardi: number;
    mercredi: number;
    jeudi: number;
    vendredi: number;
    samedi: number;
    dimanche: number;
    created: Date;
}
