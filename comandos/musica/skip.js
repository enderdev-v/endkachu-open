const Discord = require(`discord.js`);

module.exports = {
  name: "skip",
  alias: [],
	description: `salta la cancion que esta`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){
/*
		if(!message.member.voice.channel) return message.reply({ content: `Debes estar en un canal de voz`})
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: `Debes estar en el mismo canal de voz que yo`})

    
    const queue = client.distube.getQueue(message)

    if(!queue) return message.reply(`no hay una cancion en espera`)

    client.distube.skip(message)
*/
    message.reply(`mantenimiento`)


  }
  
}