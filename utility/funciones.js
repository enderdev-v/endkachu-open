const {
	ButtonStyle,
	ButtonBuilder,
	EmbedBuilder,
	ActionRowBuilder
} = require(`discord.js`);
const warnSchema = require(`../Schemas/warnSchema`);
const noteSchema = require('../Schemas/noteSchema');
const config = require(`./config.json`);
const prefixSchema = require(`../Schemas/prefixSchema`);
const fs = require('node:fs');
const path = require('node:path');
const chalk = require('chalk');

module.exports = {
	asegurado,
	setprefix,
	loadHandlers,
	paginas,
	porcentaje
};

function porcentaje(divide, num) {
  let d =  divide / num * 100
  return d   
}

async function asegurado(Schema, usuario, guild) {
	switch (Schema) {
		case warnSchema: {
			let data = await warnSchema.findOne({ guildId: guild, userId: usuario });
			if (!data) {
				data = await new warnSchema({
					guildId: guild,
					userId: usuario,
					warns: []
				});
				return await data.save();
			}
			break;
		}
		case noteSchema: {
			let data = await noteSchema.findOne({ guild: guild, user: usuario });
			if (!data) {
				data = await new warnSchema({
					guild: guild,
					user: usuario,
					notes: []
				});
				return await data.save();
			}
			break;
		}
	}
}

async function setprefix(guild) {
	let data = await prefixSchema.findOne({ guildId: guild });

	let prefix;
	if (data === null) {
		setprefix = config.prefix;
	} else {
		setprefix = data.prefix;
	}

	return setprefix;
}

function loadHandlers(client) {
	const handler = fs.readdirSync(path.join(`./handlers`));
	for (const file of handler) {
		require(path.join('../handlers', file))(client);
	}
	console.log(chalk.bold.black.bgGreen`handlers cargados`);
}

async function paginas(
	client,
	message,
	color,
	texto,
	titulo = 'Se me olvido el titulo',
	elements = 3
) {
	// embeds

	let embeds = [];
	let div = elements;
	for (let i = 0; i < texto.length; i += div) {
		let desc = texto.slice(i, elements);
		elements += div;
		let embed = new EmbedBuilder()
			.setTitle(titulo.toString())
			.setDescription(desc.join(' '))
			.setColor(color)
			.setThumbnail(message.guild.iconURL({ dynamic: true }));
		embeds.push(embed);
	}

	// paginas
	let pagactual = 0;

	if (embeds.length === 1)
		return message.channel.send({ embeds: [embeds[0]] }).catch(() => {});
	let row = new ActionRowBuilder().addComponents([
		new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setCustomId('atras')
			.setEmoji('⬅️')
			.setLabel('Atras'),

		new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setCustomId('inicio')
			.setEmoji('🏠')
			.setLabel('Inicio'),

		new ButtonBuilder()
			.setStyle(ButtonStyle.Success)
			.setCustomId('avanzar')
			.setEmoji('➡️')
			.setLabel('Avanzar')
	]);

	let m = await message.channel.send({
		embeds: [
			embeds[0].setFooter({
				text: `Pagina ${pagactual + 1} / ${embeds.length}`
			})
		],

		components: [row]
	});

	const collector = m.createMessageComponentCollector({
		ifilter: i =>
			i.isButton() &&
			i.user &&
			i.user.id == message.author.id &&
			i.message.author.id == client.user.id,
		time: 60000
	});

	collector.on('collect', async int => {
		switch (int.customId) {
			case 'atras':
				{
					collector.resetTimer();

					if (pagactual !== 0) {
						pagactual -= 1;

						await m
							.edit({
								embeds: [
									embeds[0].setFooter({
										text: `Pagina ${pagactual + 1} / ${embeds.length}`
									})
								],
								components: [m.components[0]]
							})
							.catch(() => {});

						await int.deferUpdate();
					} else {
						pagactual = embeds.length - 1;

						await m
							.edit({
								embeds: [
									embeds[0].setFooter({
										text: `Pagina ${paginaActual + 1} / ${enbeds.length}`
									})
								],
								components: [enbedpaginas.components[0]]
							})
							.catch(() => {});

						await int.deferUpdate();
					}
				}
				break;
			case 'inicio':
				{
					collector.resetTimer();

					pagactual = 0;

					await m
						.edit({
							embeds: [
								embeds[0].setFooter({
									text: `Pagina ${pagactual + 1} / ${embeds.length}`
								})
							],
							components: [m.components[0]]
						})
						.catch(() => {});

					await int.deferUpdate();
				}
				break;
			case 'avanzar':
				{
					collector.resetTimer();

					if (pagactual < embeds.length - 1) {
						pagactual++;

						await m
							.edit({
								embeds: [
									embeds[pagactual].setFooter({
										text: `Pagina ${pagactual + 1} / ${embeds.length}`
									})
								],
								components: [m.components[0]]
							})
							.catch(() => {});

						await int.deferUpdate();
					} else {
						pagactual = 0;

						await m
							.edit({
								embeds: [
									embeds[0].setFooter({
										text: `Pagina ${pagactual + 1} / ${embeds.length}`
									})
								],
								components: [m.components[0]]
							})
							.catch(() => {});

						await int.deferUpdate();
					}
				}
				break;

			default:
				break;
		}
	});
	collector.on('end', () => {
		m.components[0].components.map(boton => (boton.disabled = true));
		m.edit({
			content: `El tiempo ha expirado!`,
			embeds: [
				embeds[pagactual].setFooter({
					text: `Pagina ${pagactual + 1} / ${embeds.length}`
				})
			],
			components: [m.components[0]]
		}).catch(() => {});
	});
}
