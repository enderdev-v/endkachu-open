const { Schema, model } = require(`mongoose`)

const note = new Schema({
  notes: {
    type: Array,
    required: true
  },
  fast: {
    type: String,
    required: true
  },
	guild: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	}
})

module.exports = model(`noteSchema`, note)