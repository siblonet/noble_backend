import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  phone: String,
  email: String,
  motdepass: String,
  admin: {
    type: String,
    default: "false",
  },
  commade: String,
  created: { type: Date, default: Date.now },
});
