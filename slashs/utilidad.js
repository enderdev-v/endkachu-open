const { SlashCommandBuilder } = require(`discord.js`)
const Discord = require(`discord.js`);


module.exports = {
	data: new SlashCommandBuilder()
		.setName("utilidad")
		.setDescription(`Comandos de utilidad`)
		.addSubcommand(subcommand => subcommand
			.setName('calc')
			.setDescription('calcula dos numeros en operaciones basicas')
			.addStringOption(option =>
				option.setName('numero')
					.setDescription('escribe el primer Numero'))
			.addStringOption(option =>
				option.setName('numero2')
					.setDescription('escribe el Segundo Numero'))
			.addStringOption(option =>
				option.setName('signo').setDescription('Escribe el signo de la operacion')))
	.addSubcommand(subcommand => subcommand
				.setName(`sayembed`)
				.setDescription(`Crea y envía tu mensaje incrustado personalizado`)
				.addStringOption(option => option
							.setName(`titulo`)
							.setDescription(`Ponle un título a tu mensaje`)
							.setRequired(true))
.addStringOption(option => option
								.setName(`descripcion`)
								.setDescription(`Ponle una descripción a tu mensaje`)
								.setRequired(true))
.addStringOption(option => option
							.setName(`texto`)
							.setDescription(`Ponle un texto a tu mensaje`)
							.setRequired(true))
								.addStringOption(option => option
								.setName(`color`)
								.setDescription(`Ponle color a tu mensaje`))
								.addStringOption(option => option
								.setName(`footer`)
								.setDescription(`Ponle un pie de página a tu mensaje`))),
	
}