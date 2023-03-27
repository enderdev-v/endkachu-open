const {
	ButtonStyle,
	ChannelType,
	ActionRowBuilder,
	ButtonBuilder
} = require(`discord.js`);
const suggestSchema = require(`../../Schemas/suggestSchema`);
const ssugsSchema = require(`../../Schemas/ssugsSchema.js`);

module.exports = {
	name: 'suggest',
	alias: [],
	description: `da sugerencias al servidor usa !suggest {sugerencia}`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let data = await suggestSchema.findOne({ guildId: message.guild.id });
		if (!data)
			return message.channel.send(`no se establecio un canal o no existe`);

		let canal = message.guild.channels.cache.get(data.channelId);

		if (!canal)
			return message.channel.send(`no se establecio un canal o no existe`);

		let suggest = args.join(` `);
		if (!suggest) return message.reply(`no pusiste la sugerencia`);

		let botones = new ActionRowBuilder().addComponents([
			new ButtonBuilder()
				.setStyle(ButtonStyle.Success)
				.setEmoji(`963554878200901692`)
				.setCustomId('yes'),
			new ButtonBuilder()
				.setStyle(ButtonStyle.Danger)
				.setEmoji(`963554998321545286`)
				.setCustomId('no'),
			new ButtonBuilder()
				.setLabel('editar')
				.setStyle(ButtonStyle.Secondary)
				.setEmoji('📝')
				.setCustomId('edit'),
			new ButtonBuilder()
				.setLabel('eliminar')
				.setStyle(ButtonStyle.Secondary)
				.setEmoji('🗑️')
				.setCustomId('delete')
		]);
		let embed = {
			title: `Nueva sugerencia`,
			thumbnail: { url: `${message.author.displayAvatarURL()}` },
			description: suggest,
			color: 0x00b5be,
			fields: [
				{
					name: 'Votos Positivos 0%',
					value: '0 votos'
				},
				{
					name: `Votos Negativos 0%`,
					value: '0 votos'
				}
			],
			footer: {
				text: `Sugerencia hecha por ${message.author.tag}`
			}
		};

		message.reply(`sugerencia enviada`);

		if (canal.type === ChannelType.GuildForum) {
			let msg = await canal.threads.create({
				name: 'Nueva Sugerencia',
				message: { embeds: [embed], components: [botones] }
			});

			let ssugs = new ssugsSchema({
				message: msg.id,
				author: message.author.id
			});
			ssugs.save();
		} else {
			let msg = await canal.send({ embeds: [embed], components: [botones] });

			let ssugs = new ssugsSchema({
				message: msg.id,
				author: message.author.id
			});
			ssugs.save();
		}
		/*.then(async e => {
					e.react(``);
					e.react(``);
				});*/
	}
};
