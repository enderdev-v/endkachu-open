const snipe = require(`../../Schemas/snipeSchema`)
const { ChannelType } = require("discord.js")
module.exports = {
	name: `messageDelete`,
	async run(client, message) {
		if (message.channel.type === ChannelType.GuildForum) return;
		const msg = message.embeds.length > 0 ? `El mensaje era un embed` : message.content
		
		await snipe.findOneAndUpdate(
			{ channelId: message.channel.id },
			{
			 channelId: message.channel.id,
			 message: msg,
			 author: message.author.username,
			 time: Math.round(Date.now / 1000)
			},
			{ new: true, upsert: true }
		);
	}
}