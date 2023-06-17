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

		
		await prefixSchema.findOneAndUpdate(
			{ guildId: message.guild.id },
			{ prefix: prefix, guildId: message.guild.id },
			{ new: true, upsert: true }
		);
     message.reply({ embeds: [{ title: `Cambio de Prefix`, description: `el prefix a sido cambiado a ${prefix} `, color: 0x3f7ede }], ephemeral: true });
 
	}
};
