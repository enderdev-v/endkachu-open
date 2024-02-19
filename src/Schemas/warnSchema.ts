import { Schema, model, Document } from "mongoose";

const warn = new Schema({
  guild: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  warns: {
    type: Array,
    required: true,
    default: []
  }
});

type Twarn = {
  autor?: string
	fecha?: number
	razon?: string
}

interface Iwarn extends Document {
  guild: string
  user: string
  warns: Twarn[]
}

export default model<Iwarn>(`warnSchema`, warn);