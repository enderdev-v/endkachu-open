const Discord = require(`discord.js`)
const warnSchema = require(`../Schemas/warnSchema`)
const config = require(`./config.json`)
const prefixSchema = require(`../Schemas/prefixSchema`)   
    
module.exports = {
  asegurado,
  prefix
}

async function asegurado(usuario, guild) {
  let data = await warnSchema.findOne({ guildId: guild, userId: usuario })
  if (!data) {
    data = await new warnSchema({
      guildId: guild,
      userId: usuario,
      warns: [],
    })
    return await data.save();
  }
}

async function prefix(guild) {
  let data = await prefixSchema.findOne({ guildId: guild })

   var setprefix;
  
  if (data === null) {
    setprefix = config.prefix
  } else {
    setprefix = data.prefix
  }

  return setprefix
  
}


    