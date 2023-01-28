const Discord = require(`discord.js`)
const warnSchema = require(`../Schemas/warnSchema`)
const config = require(`./config.json`)
const prefixSchema = require(`../Schemas/prefixSchema`)   
const fs = require("node:fs")  
const path = require("node:path")
const chalk = require("chalk")
module.exports = {
  asegurado,
  setprefix,
  loadHandlers,
  
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

async function setprefix(guild) { 
   let data = await prefixSchema.findOne({ guildId: guild }) 
  
    var prefix; 
    
   if (data === null) { 
     setprefix = config.prefix 
   } else { 
     setprefix = data.prefix 
   } 
  
   return setprefix  
}

function loadHandlers(client) {
  const handler = fs.readdirSync(path.join(`./handlers`))
  for (const file of handler) {
     require(path.join("../handlers", file))(client)
  }
console.log(chalk.bold.black.bgGreen`handlers cargados`)
}
