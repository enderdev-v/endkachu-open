import { Schema, model, Document } from "mongoose";

const boost = new Schema({
    guild: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

interface Iboost extends Document {
  guild: string;
  channel: string;
  message: string;
}

export default model<Iboost>('boostSchema', boost);