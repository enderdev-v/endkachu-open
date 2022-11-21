const { ChannelType } = require(`discord.js`);
const channelSchema = require(`../../Schemas/channelSchema`)

module.exports = {
  name: "suggest-channel",
  alias: [],
	description: `establece el canal de sugerencias usa !suggest-channel {canal}`,
  userPerms: [`ManageGuild`],
  botPerms: [`ManageGuild`],

  async run(client, message, args){

   let canal = message.mentions.channels.first()
		if(!canal || canal.type !== ChannelType.GuildText) return message.reply(`el canal de sugerencias no es valido`);

    let data = await channelSchema.findOne({ guildId: message.guild.id }) 

    if(!data) {
		let newdata = new channelSchema({
			channelId: canal.id,
			guildId: message.guild.id
		})
		return await newdata.save()
	}
	await channelSchema.findOneAndUpdate({
		  channelId: canal.id,
			guildId: message.guild.id
	})
	
     await message.reply(`canal establecido`)

  }
  
}