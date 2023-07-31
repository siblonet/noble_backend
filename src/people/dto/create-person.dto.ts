import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  phone: String,
  mail: String,
  password: String,
  admin: {
    type: Boolean,
    default: false,
  },
  created: { type: Date, default: Date.now },
});