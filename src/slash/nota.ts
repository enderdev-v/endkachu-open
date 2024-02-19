import { SlashCommandBuilder } from "discord.js";
import { slashcmd } from "../types/endkachu";

const nota: slashcmd = {
    data: new SlashCommandBuilder()
		.setName('note')
		.setDescription(`notas del bot`)
		.addSubcommand(subcommand => subcommand
			.setName('add')
			.setDescription('añade una nota a tu lista')
			.addStringOption(option =>
				option.setName('titulo')
					.setDescription('añade un título a tu nota')
				.setRequired(true))
	.addStringOption(option =>
				option.setName('nota')
					.setDescription('añade la nota')
					.setRequired(true)))
	.addSubcommand(subcommand => subcommand
			.setName('delete')
			.setDescription('calcula dos numeros en operaciones basicas')
				.addNumberOption(option =>
				option.setName('id')
					.setDescription('escribe la id de la nota')
					.setRequired(true)))
	.addSubcommand(subcommand => subcommand
			.setName('list')
			.setDescription('calcula dos numeros en operaciones basicas')),
};

export default nota;