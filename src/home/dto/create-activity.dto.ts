import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  addarticle: { type: String },
  addprixpro: { type: Number },
  addprix: { type: Number },
  addfour: { type: String },
  adddispo: { type: String },
  addcoul: { type: String },
  addtail: { type: String },
  addmateri: { type: String },
  addtype: { type: String },
  addphone: { type: String },
  quantity: { type: String },
  addexpe: { type: String },
  who: { type: String },
  notes: { type: String },
  image: [{ima: String}],
  created: { type: Date, default: Date.now }
});
