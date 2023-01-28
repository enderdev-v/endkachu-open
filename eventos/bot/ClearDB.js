const leaveSchema = require("../../Schemas/leaveSchema")
const suggestSchema = require("../../Schemas/suggestSchema")
// const embedSchema = require("../../Schemas/embedSchema")
const snipeSchema = require("../../Schemas/snipeSchema")
const reviveSchema = require("../../Schemas/reviveSchema")
const warnSchema = require("../../Schemas/warnSchema")
const prefixSchema = require("../../Schemas/prefixSchema")
const welcomeSchema = require("../../Schemas/welcomeSchema")


module.exports = {
  name: "guildDelete",
  async run (client, guild) {
    
    await leaveSchema.findOneAndDelete({ guild: guild.id })
    await prefixSchema.findOneAndDelete({ guildId: guild.id })
    await warnSchema.findOneAndDelete({ guildId: guild.id })
    await reviveSchema.findOneAndDelete({ guild: guild.id })
    await suggestSchema.findOneAndDelete({ guildId: guild.id })
    await prefixSchema.findOneAndDelete({ guildId: guild.id })
    await snipeSchema.findOneAndDelete({ guildId: guild.id })
    // await embedSchema.findOneAndDelete({ guildID: guild.id })
    await welcomeSchema.findOneAndDelete({ guild: guild.id })
    
      }
}