const { SlashCommandBuilder } = require(`discord.js`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription(`Muestra la latencia del bot`),

	async run(client, int) {
		await int.reply({ embeds: [{ title: "Ping", description: `\<:interesante:963559201584607373> Pong! ${client.ws.ping}ms`, color: 0x3f7ede }] })

	}
}