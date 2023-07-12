const { ChannelType } = require(`discord.js`);
const suggestSchema = require(`../../Schemas/suggestSchema`);

module.exports = {
	name: 'suggest-channel',
	alias: [],
	description: `establece el canal de sugerencias usa !suggest-channel {canal}`,
	userPerms: [`ManageGuild`],
	botPerms: [`ManageGuild`],

	async run(client, message, args) {
		let canal = message.mentions.channels.first();
		if (!canal || canal.type === ChannelType.GuildStageVoice || canal.type === ChannelType.GuildVoice) return message.reply({ embeds: [{ title: 'Canal no valido', description: `Ese canal no es válido o no existe en este servidor`, color: 0xe14e2c }] });

		await suggestSchema.findOneAndUpdate(
			{ guildId: message.guild.id },
			{ guildId: message.guild.id, channelId: canal.id },
			{ new: true, upsert: true }
		);

		message.reply({ embeds: [{ title: `canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: 0x297020 }] });
	}
};
