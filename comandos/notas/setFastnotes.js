const { ChannelType } = require(`discord.js`);
const noteSchema = require('../../Schemas/noteSchema');
module.exports = {
	name: 'setfastnotes',
	alias: [],
	description: 'Configura el canal de notas rápidas',
	usage: '!setfastnotes {canal}',
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let canal = message.mentions.channels.first();
		if (!canal || canal.type !== ChannelType.GuildText)
			return message.reply({
				embeds: [
					{
						title: 'Canal no valido',
						description: `canal de bienvenidas no valido`,
						color: 0xe14e2c
					}
				]
			});

		await noteSchema.findOneAndUpdate(
			{ guild: message.guild.id },
			{ guild: message.guild.id, fastnotes: canal.id },
			{ new: true, upsert: true }
		);
		message.reply({
			embeds: [
				{
					title: `canal establecido`,
					description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`,
					color: 0x297020
				}
			]
		});
	}
};
