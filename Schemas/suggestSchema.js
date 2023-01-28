const { Schema, model } = require(`mongoose`)

const suggest = new Schema({
  channelId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  }
})

module.exports = model(`suggestSchema`, suggest)