const Discord = require(`discord.js`);

module.exports = {
  name: "jumbo",
  alias: [],
	description: `muestra emojis personalizados grandes del servidor \n usa !jumbo {emoji}`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

    let emoji = args[0]
    if(!emoji) return message.reply({ content: 'manda un emoji', allowedMentions: { repliedUser: false }}) 

    let emote = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
    if(!emote) return message.reply({ content: 'no se encontró el emoji', allowedMentions: { repliedUser: false }})

    
    message.channel.send(emote.url)
    

  }
}  