const { ChannelType } = require("discord.js")
const reviveSchema = require("../../Schemas/reviveSchema")

module.exports = {
  name: "revive-chat",
  alias: [],
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {
     let preguntas = ["Como les va hoy?", "Que comieron hoy?", "Que hacen?", "Que prefieren Horchata o Jamaica?", "Que animales les gustan?"]
      let random = Math.floor(Math.random()*(preguntas.length)) 
      
    let data = await reviveSchema.findOne({ guild: message.guild.id })

    if (!data || !data.channel) return message.reply({ embeds: [{ title: `Error`, description: `No hay un canal para revivir el canal`, color: 0x3f7ede }] })
   let canal = message.guild.channels.cache.get(data.channel)
     
    if (canal.type === ChannelType.GuildForum) {
      if (!data.role) return canal?.threads.create({ name: 'Pregunta', message: { content: `${preguntas[random]} ` } })
  
      canal?.threads.create({ name: 'Pregunta', message: { content: `${preguntas[random]} <@&${data.role}>` } })
    } 
    if (canal.type === ChannelType.GuildText) {
      try {
        if (!data.role) return canal?.send(`${preguntas[random]}`)
          canal?.send(`${preguntas[random]} <@&${data.role}>`)
      } catch (error) {
         console.log(error)
      }
      

    }

  }
}