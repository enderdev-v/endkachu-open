const { ChannelType } = require(`discord.js`)
const leaveSchema = require("../../Schemas/leaveSchema")
module.exports = {
  name: "setleave",
  alias: [],
  userPerms: [`Administrator`],
  botPerms: [`Administrator`],

  async run(client, message, args) {

        let canal = message.mentions.channels.first()
		if(!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: "Canal no valido", description: `canal de bienvenidas no valido`, color: 0xe14e2c }] });

    let data = await leaveSchema.findOne({ guildId: message.guild.id }) 

    if(!data) {
		let newdata = new leaveSchema({
			channel: canal.id,
			guild: message.guild.id
		})
		return await newdata.save()
	}
	await leaveSchema.findOneAndUpdate({
		  channel: canal.id,
			guild: message.guild.id
	})
	
    message.reply({ embeds: [{ title: `canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: 0x297020 }]})

  }
  
}