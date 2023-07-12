const { EmbedBuilder } = require(`discord.js`);

module.exports = {
	name: "sayembed",
	alias: [],
	description: `muestra informacion del usuario en embed usa !sayembed {titulo} {info} `,
	userPerms: [`Administrator`],
	botPerms: [`Administrator`],

	async run(client, message, args) {
		const texto = args.slice(1).join(" "),
			title = args[0]

		if (!texto) return message.channel.send("que escribo en el anuncio")
		if (!title) return message.channel.send("que escribo en el anuncio")

		let embed = new EmbedBuilder()
			.setTitle(title)
			.setThumbnail(message.guild.iconURL())
			.setColor(0x3f7ede)
			.addFields({
				name: "Anuncio:",
				value: texto,
				inline: false
			})
			.setFooter({ text: `Servidor ${message.guild.name}` })

		message.channel.send({ embeds: [embed] })
	}

}