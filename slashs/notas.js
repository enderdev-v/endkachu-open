const { SlashCommandBuilder } = require(`discord.js`);
const Discord = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nota')
		.setDescription(`Muestra la latencia del bot`),

	async run(client, int) {
		int.reply(`Pong! ${client.ws.ping}ms`);
	}
};