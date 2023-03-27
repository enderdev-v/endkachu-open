const Discord = require(`discord.js`);
const { ButtonStyle } = require(`discord.js`);

module.exports = {
	name: 'botinfo',
	alias: [],
	description: `muestra informacion sobre el bot`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let d = Math.floor(client.uptime / 86400000);
		let h = Math.floor(client.uptime / 3600000) % 24;
		let m = Math.floor(client.uptime / 60000) % 60;
		let s = Math.floor(client.uptime / 1000) % 60;

		let embed = new Discord.EmbedBuilder()
			.setTitle('**Informacion de endkachu**')
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(0x00f3b5)
			.setDescription(
				'hola soy endkachu es un bot de multifunción que viene a alegrar tu servidor'
			)
			.addFields(
				{
					name: `Prefix:`,
					value: `**!**`,
					inline: false
				},
				{
					name: `Lenguaje:`,
					value: '```Javascript \n```',
					inline: false
				},
				{
					name: `Creador:`,
					value: `**endercrack#4934**`,
					inline: false
				},
				{
					name: `Dessarrolladores:`,
					value: `**__endercrack#4934__**`,
					inline: false
				},
				{
					name: `Creación del bot:`,
					value: `${client.user.createdAt.toLocaleDateString()}`,
					inline: false
				},
				{
					name: '**Librerias:**',
					value: `> Discord.js **v14.6.0** \n > MongoDB **6.7.3** `,
					inline: true
				},
				{
					name: `**Stats**`,
					value: `> **Servidores:** **__${
						client.guilds.cache.size
					}__** \n > **Usuarios:** **__${
						client.users.cache.size
					}__** \n > **Canales:** **__${
						client.channels.cache.size
					}__** \n > **Uptime:** **__${d} dias, ${h} horas, ${m} minutos, ${s} segundos__**~~`,
					inline: true
				}
			);

		let row = new Discord.ActionRowBuilder().addComponents([
			new Discord.ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel('Soporte')
				.setURL('https://discord.gg/PHNGpjh4jc')
				.setEmoji('1044251490677690441'),

			new Discord.ButtonBuilder()
				.setStyle(ButtonStyle.Link)
				.setLabel('Web')
				.setURL('https://endkachu-web.endercrackyt.repl.co/')
				.setEmoji('1044251559988563978')
		]);

		await message.channel.send({ embeds: [embed], components: [row] });
	}
};
