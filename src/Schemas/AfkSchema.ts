import { Schema, model, Document } from "mongoose";

const afk = new Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

interface Iafk extends Document {
  user: string;
  date: number;
}

export default model<Iafk>('afkSchema', afk);