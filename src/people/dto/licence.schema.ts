import * as mongoose from 'mongoose';

export const LicenceDefSchema = new mongoose.Schema({
    Silenceko: String,
    Silenceka: String,
    Auteur: {
        type: String,
        default: "Defdaar",
    },
    Auteta: {
        type: String,
        default: "Encien",
    },
    capacity: {
        type: Number,
        default: 1,
    },
    used: {
        type: Number,
        default: 0,
    },
    Liceeta: {
        type: String,
        default: "Utilisable",
    },
    Licetyp: {
        type: String,
        default: "Gratuit",
    },
    actimotif: {
        type: String,
        default: "normale",
    },
    compu: {
        type: String,
        default: "Wind",
    },
    defverson: {
        type: String,
        default: "2.0.9",
    },
    logcount: {
        type: Number,
        default: 9,
    },
    create_tim: {
        type: Date,
        default: new Date().toISOString(),
    }
})
