import { Document } from 'mongoose';

export interface Deduction extends Document {
  readonly description: string;
  readonly price: string;
  readonly user_id: string;
  readonly date_posted: string;
}