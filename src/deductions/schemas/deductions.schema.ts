import * as mongoose from 'mongoose';

export const DeductionsSchema = new mongoose.Schema({
  description: String,
  price: String,
  user_id: String,
  date_posted: String,
});