import { Schema, model, Document } from "mongoose";

const snipe = new Schema({
    guild: {
        type: String,
        required: true,
    },
    logs: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: false
    },

    author: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

interface Isnipe extends Document {
    guild: string;
    logs: string;
    channel: string;
    message: string;
    author: string;
    time: number;
}


export default model<Isnipe>("snipeSchema", snipe);