import { Schema, model, Document } from "mongoose";

const revive = new Schema({
  channel: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: " "
  },
  guild: {
    type: String,
    required: true
  },
});

interface Irevive extends Document {
  channel: string
  role: string 
  guild: string
}

export default model<Irevive>(`reviveSchema`, revive);