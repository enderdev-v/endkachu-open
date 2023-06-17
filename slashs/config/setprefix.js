const prefixSchema = require("../../Schemas/prefixSchema")

module.exports = {
	subcommand: `config.setprefix`,
	async run(client, int) {
		const prefix = int.options.getString('prefix');

		 
		await prefixSchema.findOneAndUpdate(
			{ guildId: int.guild.id },
			{ prefix: prefix, guildId: int.guild.id },
			{ new: true, upsert: true }
		);

		int.reply({ embeds: [{ title: `Cambio de Prefix`, description: `el prefix a sido cambiado a ${prefix} `, color: 0x3f7ede }] });

	}};
