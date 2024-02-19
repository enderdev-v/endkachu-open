import { Schema, model, Document } from "mongoose";

const bye = new Schema({
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

interface Ibye extends Document {
  guild: string;
  channel: string;
  message: string;
}

export default model<Ibye>('byeSchema', bye);