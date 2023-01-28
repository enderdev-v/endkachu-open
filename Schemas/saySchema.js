const { Schema, model } = require(`mongoose`);

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

module.exports = model('saySchema', say);
