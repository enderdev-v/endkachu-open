const { Schema, model } = require(`mongoose`)

const leave = new Schema({
  channel: {
    type: String,
    required: true
  },
  guild: {
    type: String,
    required: true
  }
})

module.exports = model(`leaveSchema`, leave)