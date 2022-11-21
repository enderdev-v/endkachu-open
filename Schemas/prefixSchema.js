const { Schema, model } = require(`mongoose`)

const prefix = new Schema({
  prefix: {
    type: String,
    required: true, 
  },
  guildId: {
    type: String,
    required: true
  }
})

module.exports = model(`prefixSchema`, prefix)