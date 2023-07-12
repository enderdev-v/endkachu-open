const Discord = require(`discord.js`);
const { opts, general, mod, util, config, fun, notes } = require(`../../utility/help.js`)

module.exports = {
	name: 'help',
	alias: [],
	description: `muestra los comandos del bot`,
	usage: `help [comando]`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		const embed = new Discord.EmbedBuilder()
			.setTitle('✨ Hola soy  endkachu✨')
			.setColor(0x3f7ede)
			.setDescription(
				'te brindo una lista de todas las categorías de comandos que yo tengo '
			)
			.addFields({
				name: '◦•≫ Categorias',
				value:
					'<:interesante:1044261055280463882> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas \n Automod',
				inline: false
			}),
			menu = new Discord.ActionRowBuilder().addComponents(
				new Discord.SelectMenuBuilder()
					.setCustomId('menu')
					.setMaxValues(1)
					.setPlaceholder('⚡ Seleccion de Categorias ')
					.addOptions(opts)
			),
			cmd = client.commands.get(args[0]);
			

		if (args[0]) {
			helpcmd = {
				title: `ayuda del comando **${cmd.name}**`,
				description: `**Descripción del comando** \n ${cmd.description}`,
				fields: [
					{
						name: `alias`,
						value: `${cmd.alias}`
					},
					{
						name: `Permisos del bot`,
						value: `${cmd.botPerms ? cmd.userPerms.join(" ,") : "no hay permisos necesarios para el mi"}`
					},
					{
						name: `Permisos del usuario`,
						value: `${cmd.userPerms ? cmd.userPerms.join(", ") : "No hay permisos para el usuario"}`
					}
				],
				color: 0x3f7ede,
				footer: { text: ` [] opcional, {} requerido` }
			}; 
			if (cmd) {
				return message.channel.send({ embeds: [helpcmd] });
			} else return message.channel.send('no se encontro el comando');
		}


		const m = await message.channel.send({ embeds: [embed], components: [menu] });
		const ifilter = i => i.user.id === message.author.id;
		const collector = m.createMessageComponentCollector({ filter: ifilter, time: 60000 })

		collector.on(`collect`, async i => {
			if (i.values[0] === `general`) {
				await i.deferUpdate()
				await m.edit({ embeds: [general] })
			} else if (i.values[0] === `mod`) {
				await i.deferUpdate()
				await m.edit({ embeds: [mod] })
			} else if (i.values[0] === `util`) {
				await i.deferUpdate()
				await m.edit({ embeds: [util] })
			} else if (i.values[0] === `config`) {
				await i.deferUpdate()
				await m.edit({ embeds: [config] })
			} else if (i.values[0] === `funny`) {
				await i.deferUpdate()
				await m.edit({ embeds: [fun] })
			} else if (i.values[0] === `notes`) {
				await i.deferUpdate()
				await m.edit({ embeds: [notes] })
			} else if (i.values[0] === `home`) {
				await i.deferUpdate()
				await m.edit({ embeds: [embed] })
			}
		})

	}
};
