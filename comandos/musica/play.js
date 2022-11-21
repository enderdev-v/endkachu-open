const Discord = require(`discord.js`);
const distube = require("distube")

module.exports = {
  name: "play",
  alias: [],
	description: `pone musica en el canal de voz \n usa !play {cancion} `,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

		let cancion = args.join(` `)
    if(!cancion) return message.reply(`debes poner una cancion`)
    if(!message.member.voice.channel) return message.reply(`Debes estar en un canal de voz`)

    if(message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(`Debes estar en el mismo canal de voz que yo`)

    try {
     client.distube.play(
      message.member.voice.channel,
      cancion,
      {
        textChannel: message.channel,
        member: message.member
      }
    );

		
    message.reply({ embeds: [{ color: 0x00ae9f, description: `Reproduciendo cancion...`}] })
 

   
    } catch (error) {
      console.log(error)
    }
    }
  
}