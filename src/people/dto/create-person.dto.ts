import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  phone: String,
  email: String,
  motdepass: String,
  admin: {
    type: Boolean,
    default: false,
  },
  commade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
},
  created: { type: Date, default: Date.now },
});
