const { Schema, model } = require(`mongoose`)

const embed = new Schema({
  color: {
    type: String,
    required: false,
  },
  footer: {
    type: String,
    required: false,
  },
  msg: {
    type: String,
    required: false
  },
  guild: {
    type: String,
    required: true
  }
})

module.exports = model(`embedSchema`, embed)