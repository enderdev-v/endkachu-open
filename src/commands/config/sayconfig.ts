import { ChannelType } from "discord.js";
import saySchema from "../../Schemas/saySchema";
import { cmd } from "../../types/endkachu";

const sayconfig: cmd = {
	name: "sayconfig",
	alias: [],
	description: "configura el comando say",
	usage: "sayconfig <watermark, logs, antilinks> <options>",
	botPerms: [`Administrator`],
	userPerms: [`Administrator`],
	isOwner: false,
	run: async (client, message, args) => {
		const opt = args[1];
		const option = args[0];

		if (!option) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste una opción \n opciones: antilinks, watermark, logs` }] });

		await saySchema.findOneAndUpdate(
			{ guild: message.guild.id },
			{ guild: message.guild.id },
			{ new: true, upsert: true }
		);

		const saveData = async (data) => {
			return await saySchema.findOneAndUpdate(
				{ guild: message.guild.id },
				data,
				{ new: true, upsert: true }
			);
		};
		const obj = {
			watermark: (type) => {
				const opts = ["none", "reply", "footer"];

				if (!type) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste una opción valida \n opciones: footer, reply, none` }] });
				if (!opts.includes(type.toLowerCase())) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste una opción valida  \n opciones: footer, mention, none` }] });
				saveData({ watermark: type.toLowerCase() });
				return message.reply({ embeds: [{ title: 'Sayconfig Watermark', color: client.green, description: `${type.toLowerCase()} fue seleccionada correctamente` }] });

			},
			logs: (type) => {

				const canal = message.guild.channels.cache.get(type) || message.mentions.channels.first();

				if (!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste un canal valido` }] });

				saveData({ logs: canal.id });
				return message.reply({ embeds: [{ title: 'Sayconfig Logs', color: client.green, description: `${type} fue seleccionada correctamente` }] });
			},
			antilinks: (type) => {

				if (!type) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste una opción  \n opciones: on, off` }] });

				if (type.toLowerCase() !== ("on" || "off")) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste una opción  \n opciones: on, off` }] });


				saveData({ antilinks: type.toLowerCase() });
				return message.reply({ embeds: [{ title: 'Sayconfig Antilinks', color: client.green, description: `${type.toLowerCase() === "on" ? "Se activo el antilinks" : "se a desactivo el antilinks"}` }] });
			}
		};
		const ejecutar = obj[option.toLowerCase()];

		ejecutar(opt);

	}
};
export default sayconfig;