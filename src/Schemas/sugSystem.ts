import { Schema, model, Document } from "mongoose";

const ssuggestion = new Schema({
	message: {
		type: String,
		required: true
	},
	yes: {
		type: Array,
		default: []
	},
	no: {
		type: Array,
		default: []
	},
	author: {
		type: String,
		required: false
	}
});

interface IsugsSystem extends Document {
	message: string
	yes: string[]
	no: string[]
	author: string
}

export default model<IsugsSystem>('ssugsSchemas', ssuggestion);