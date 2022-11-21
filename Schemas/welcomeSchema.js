const { Schema, model } = require(`mongoose`)

const welcome = new Schema({
  channel: {
    type: String,
    required: true
  },
  guild: {
    type: String,
    required: true
  }
})

module.exports = model(`welcomeSchema`, welcome)