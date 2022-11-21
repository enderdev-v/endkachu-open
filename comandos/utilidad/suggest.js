const { EmbedBuilder } = require(`discord.js`);
const channelSchema = require(`../../Schemas/channelSchema`)

module.exports = {
  name: "suggest",
  alias: [],
	description: `da sugerencias al servidor usa !suggest {sugerencia}`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){
  try{
		let suggest = args.join(` `)
		if(!suggest) return message.reply(`no pusiste la sugerencia`)

		let canal = await channelSchema.findOne({ guildId: message.guild.id })

    if (!canal ||  !canal.channelId || !message.guild.channels.cache.get(canal.channelId)) return message.channel.send(`no se establecio un canal o no existe`)
    
		message.reply(`sugerencia enviada`)

			let embed = new EmbedBuilder() 
		  .setTitle("Nueva sugerencia")
			.setThumbnail(message.author.displayAvatarURL())
	    .setDescription(suggest) 
		  .setColor("Green")
			.setFooter({ text: `Sugerencia hecha por ${message.author.tag}` });
		
	    message.guild.channels.cache.get(canal.channelId).send({ embeds: [embed] }).then(async (e) => {
			e.react(`963554998321545286`)
			e.react(`963554878200901692`)
		})

		
		
	}catch(e) {
		console.error(e)
	}
		
  }
  
}