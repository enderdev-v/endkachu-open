const { Schema, model } = require(`mongoose`)

const warn = new Schema({
  guildId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  warns: {
    type: Array,
    required: true,
    default: []
  }
})

module.exports = model(`warnSchema`, warn)