const Discord = require(`discord.js`);
const prefixSchema = require(`../../Schemas/prefixSchema`);

module.exports = {
	name: 'setprefix',
	alias: [],
	description: `Comando para cambiar el prefix`,
	userPerms: [`ManageGuild`],
	botPerms: [`ManageGuild`],

	async run(client, message, args) {
		let prefix = args.join(' ');

		if (!prefix) return message.reply(`No Pusiste el prefix`);

		let data = await prefixSchema.findOne({ guildId: message.guild.id });

		await prefixSchema.findOneAndUpdate(
			{ guildId: message.guild.id },
			{ prefix: prefix, guildId: message.guild.id },
			{ new: true, upsert: true }
		);

		message.reply(`Prefix Cambiado a ${prefix}`);
	}
};
