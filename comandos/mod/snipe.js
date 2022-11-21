const Discord = require(`discord.js`);
const snipe = require(`../../Schemas/snipeSchema.js`) 

module.exports = {
  name: "snipe",
  alias: [],
	description: `muestra los mensajes borrados recientemente`,
  userPerms: ['ManageGuild'],
  botPerms: ['ManageGuild'],
  async run(client, message, args){

		
		try{
			
		  let data = await snipe.findOne({ channelId: message.channel.id })

	   	if(!data) return message.reply(`no se a borrado ningun mensaje todavia`)

		  let embed = new Discord.EmbedBuilder()
	   	.setTitle(`Mensaje borrado de ${data.author}`)
	   	.setColor(`Red`)
	  	.setDescription(`${data.message}`)
	  	.addFields(
  {
        name: `Canal`, 
        value: `<#${data.channelId}>`, 
        inline: false 
  },
        {
      name: `Hora y Dia`, 
        value: `<t:${data.time}> \n <t:${data.time}:R>`, 
        inline: false 
        }
      )

		  message.channel.send({ embeds: [embed] })

		} catch(e){
			console.error(e)
			message.reply("hubo un error tal vez sea por el mensaje ")
		}


  }
  
}