const { SlashCommandBuilder } = require(`discord.js`)
const prefixSchema = require("../Schemas/prefixSchema")
const { PermissionFlagsBits } = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`config`)
		.setDescription(`Configura al bot`)
		.addSubcommand(subcommand => subcommand
			.setName('setprefix')
			.setDescription('Configura el prefix del bot')
			.addStringOption(option =>
				option.setName('prefix')
					.setDescription('escribe el prefix que quieres para el bot')
					.setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
}