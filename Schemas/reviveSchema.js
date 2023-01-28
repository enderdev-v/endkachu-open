const { Schema, model } = require(`mongoose`)

const revive = new Schema({
  channel: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: " "
  },
  guild: {
    type: String,
    required: true
  },
})

module.exports = model(`reviveSchema`, revive)