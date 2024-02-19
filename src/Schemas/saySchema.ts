import { Schema, model, Document } from "mongoose";

const say = new Schema({
	guild: {
		type: String,
		required: true
	},
	watermark: {
		type: String,
		
	},
	logs: {
		type: String
	},
	antilinks: {
		type: Boolean
	},
});

interface Isay extends Document {
	guild: string;
	watermark: string;
	logs: string;
	antilinks: boolean;
}

export default model<Isay>('saySchema', say);