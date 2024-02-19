import { Schema, model, Document } from "mongoose";

const suggest = new Schema({
  channelId: {
    type: String,
    required: true
  },
  guild: {
    type: String,
    required: true
  }
});

interface Isuggest extends Document {
  channelId: string
  guild: string
}

export default model<Isuggest>(`suggestSchema`, suggest);