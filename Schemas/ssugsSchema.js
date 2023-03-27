const { Schema, model } = require(`mongoose`);

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

module.exports = model('ssugsSchemas', ssuggestion);
