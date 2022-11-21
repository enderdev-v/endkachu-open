const { ChannelType } = require(`discord.js`)
const welcomeSchema = require("../../Schemas/welcomeSchema")
module.exports = {
  name: "setwelcome",
  alias: [],
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

        let canal = message.mentions.channels.first()
		if(!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: "Canal no valido", description: `canal de bienvenidas no valido`, color: 0xbc0000 }] });

    let data = await welcomeSchema.findOne({ guildId: message.guild.id }) 

    if(!data) {
		let newdata = new welcomeSchema({
			channel: canal.id,
			guild: message.guild.id
		})
		return await newdata.save()
	}
	await welcomeSchema.findOneAndUpdate({
		  channel: canal.id,
			guild: message.guild.id
	})
	
    message.reply({ embeds: [{ title: `canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: 0x00c800 }]})

  }
  
}