const { ChannelType } = require(`discord.js`);
const saySchema = require(`../../Schemas/saySchema`);
module.exports = {
	name: 'sayconfig',
	alias: [],
	description: 'Configura el comando say',
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],

	async run(client, message, args) {
		const opt = args[1],
    option = args[0];

		if (!option) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción \n opciones: antilinks, watermark, logs` }] });

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
		}
	  const obj = {
			watermark: (type) => {
				const opts = ["none", "mention", "footer"]

				if (!type) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción valida \n opciones: footer, mention, none` }] });
				if (!opts.includes(type.toLowerCase())) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción valida  \n opciones: footer, mention, none` }] });
				saveData({ watermark: type.toLowerCase() })
				return message.reply({ embeds: [{ title: 'Sayconfig Watermark', color: 0x297020, description: `${type.toLowerCase()} fue seleccionada correctamente` }] });

			},
			logs: (type) => {

				let canal = message.guild.channels.cache.get(type) || message.mentions.channels.first();

				if (!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste un canal valido` }] });

				saveData({ logs: canal.id })
				return message.reply({ embeds: [{ title: 'Sayconfig Logs', color: 0x297020, description: `${type} fue seleccionada correctamente` }] });
			},
			antilinks: (type) => {

				if (!type) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción  \n opciones: on, off` }] });

				if (type.toLowerCase() !== ("on" || "off")) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción  \n opciones: on, off` }] });


				saveData({ antilinks: type.toLowerCase() })
				return message.reply({ embeds: [{ title: 'Sayconfig Antilinks', color: 0x297020, description: `${type.toLowerCase() === "on" ? "Se activo el antilinks" : "se a desactivo el antilinks"}` }] });
			}
		}
	  const ejecutar = obj[option.toLowerCase()]

		ejecutar(opt)

	}
};
