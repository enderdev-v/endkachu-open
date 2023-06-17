const snipe = require(`../../Schemas/snipeSchema`)
const { ChannelType } = require("discord.js")
module.exports = {
	name: `messageDelete`,
	async run(client, message) {
		if (message.channel.type === ChannelType.GuildForum) return;
  let data = await snipe.findOne({ channelId: message.channel.id }) 
  let msg = message.embeds.length > 0 ? `El mensaje era un embed` : message.content
	if(!data) {
		let newdata = new snipe({
			channelId: message.channel.id,
			message: msg,
			author: message.author.tag,
      time: Math.round(Date.now() / 1000)
		})
		return await newdata.save()
	}
	await snipe.findOneAndUpdate({
		  channelId: message.channel.id,
			message: msg,
			author: message.author.tag,
      time: Math.round(Date.now() / 1000)
	})
	}
}