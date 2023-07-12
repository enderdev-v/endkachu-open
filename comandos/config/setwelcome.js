const { ChannelType } = require(`discord.js`);
const welcomeSchema = require('../../Schemas/welcomeSchema');
module.exports = {
	name: 'setwelcome',
	alias: [],
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],

	async run(client, message, args) {

		let canal = message.mentions.channels.first();

		if (!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: 'Canal no valido', description: `canal de bienvenidas no valido`, color: 0xe14e2c }] });
		await welcomeSchema.findOneAndUpdate(
			{ guild: message.guild.id },
			{ channel: canal.id, guild: message.guild.id },
			{ new: true, upsert: true }
		);


		message.reply({ embeds: [{ title: `canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: 0x297020 }] });


	}
};