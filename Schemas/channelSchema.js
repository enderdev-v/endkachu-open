const { Schema, model } = require(`mongoose`)

const channel = new Schema({
  channelId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  }
})

module.exports = model(`channelSchema`, channel)