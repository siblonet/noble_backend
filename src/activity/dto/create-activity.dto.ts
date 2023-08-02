import * as mongoose from 'mongoose';

export const ActivitySchema = new mongoose.Schema({
  lundi: { type: Number, default: 0 },
  mardi: { type: Number, default: 0 },
  mercredi: { type: Number, default: 0 },
  jeudi: { type: Number, default: 0 },
  vendredi: { type: Number, default: 0 },
  samedi: { type: Number, default: 0 },
  dimanche: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});


export const ActivityrepSchema = new mongoose.Schema({
  lundi: { type: Number, default: 0 },
  mardi: { type: Number, default: 0 },
  mercredi: { type: Number, default: 0 },
  jeudi: { type: Number, default: 0 },
  vendredi: { type: Number, default: 0 },
  samedi: { type: Number, default: 0 },
  dimanche: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

export const CompteSchema = new mongoose.Schema({
  lundi: { type: Number, default: 0 },
  mardi: { type: Number, default: 0 },
  mercredi: { type: Number, default: 0 },
  jeudi: { type: Number, default: 0 },
  vendredi: { type: Number, default: 0 },
  samedi: { type: Number, default: 0 },
  dimanche: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
});

