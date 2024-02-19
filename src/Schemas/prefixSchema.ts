import { Document, Schema, model } from "mongoose";


const prefix = new Schema({
  guild: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true, 
  }
});

interface Iprefix extends Document {
  prefix: string
  guild: string
}

export default model<Iprefix>(`prefixSchema`, prefix);