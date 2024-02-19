import { Document, Schema, model } from "mongoose";

const note = new Schema({
	notes: {
		type: Array,
		required: true,
		default: []
	},
	fastnotes: {
		type: String,
		required: false
	},
	guild: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	}
});

type Tnote = {
	fecha: number
	titulo: string
	nota: string
}

interface Inote extends Document {
	notes: Tnote[]
	fastnotes: string
	guild: string
	user: string
}

export default model<Inote>(`noteSchema`, note);