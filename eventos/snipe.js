module.exports = {
	name: `messageDelete`,
	async run(client, message) {
		const snipe = require(`../Schemas/snipeSchema`)

  let data = await snipe.findOne({ channelId: message.channel.id }) 

	if(!data) {
		let newdata = new snipe({
			channelId: message.channel.id,
			message: message.content,
			author: message.author.tag,
      time: Math.round(Date.now() / 1000)
		})
		return await newdata.save()
	}
	await snipe.findOneAndUpdate({
		  channelId: message.channel.id,
			message: message.content,
			author: message.author.tag,
      time: Math.round(Date.now() / 1000)
	})
	}
}