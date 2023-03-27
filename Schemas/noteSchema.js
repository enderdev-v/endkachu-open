const { Schema, model } = require(`mongoose`);

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
	},
	perms: {
		type: String,
		required: false
	}
});

module.exports = model(`noteSchema`, note);
