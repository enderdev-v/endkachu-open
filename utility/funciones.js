const { ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require(`discord.js`);
const warnSchema = require(`../Schemas/warnSchema`);
const noteSchema = require('../Schemas/noteSchema');
const config = require(`./config.json`);
const prefixSchema = require(`../Schemas/prefixSchema`);
const fs = require('node:fs');
const path = require('node:path');
const chalk = require('chalk');

module.exports = {
	loadHandlers,
	paginas,
	porcentaje
};

function porcentaje(divide, num) {
	let d = divide / num * 100
	return d
}

function loadHandlers(client) {
	//mejorar
	const handler = fs.readdirSync(path.join(`./handlers`));
	for (const file of handler) {
		require(path.join('../handlers', file))(client);
	}
	console.log(chalk.bold.black.bgGreen`handlers cargados`);
}

async function paginas(message, color, texto, titulo, elements) {

	let embeds = [];
	let div = elements;
	for (let i = 0; i < texto.length; i += div) {
		let desc = texto.slice(i, elements);
		elements += div;
		let embed = new EmbedBuilder().setTitle(titulo.toString()).setDescription(desc.join(' ')).setColor(color).setThumbnail(message.guild.iconURL({ dynamic: true }));
		embeds.push(embed);
	}

	
	let pagactual = 0;

	if (embeds.length === 1)
		return message.channel.send({ embeds: [embeds[0]] });
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

	let m = await message.channel.send({ embeds: [embeds[0].setFooter({text: `Pagina ${pagactual + 1} / ${embeds.length}`}) ], components: [row] });

	const collector = m.createMessageComponentCollector({ ifilter: i => i.user.id == message.author.id, time: 60000 }); 

	const msg = async (pag) => {
	  await m.edit({ embeds: [embeds[pag].setFooter({text: `Pagina ${pag + 1} / ${embeds.length}`})],  components: [m.components[0]] })	
	}
	collector.on('collect', async int => {
		
				if (int.customId === "atras") {
					if (pagactual !== 0) {
						pagactual -= 1;

						msg(pagactual)
						await int.deferUpdate();
					} else {
						pagactual = embeds.length - 1;

						
						msg(pagactual)
						await int.deferUpdate();
					}				
				} else if (int.customId === "inicio") {
					pagactual = 0;

					msg(pagactual)
					await int.deferUpdate();
				} else {
					if (pagactual < embeds.length - 1) {
						pagactual++;

						await msg(pagactual)
						await int.deferUpdate();
					} else {
						pagactual = 0;

						msg(pagactual)
						await int.deferUpdate();
					}
				 
				}
				collector.resetTimer();
	});
	collector.on('end', async () => {
    m.components[0].components.map(button => button.data.disabled = true)
    await m.edit({ content: `El tiempo ha expirado!`, embeds: [embeds[pagactual].setFooter({text: `Pagina ${pagactual + 1} / ${embeds.length}`})], components: [m.components[0]] }) });
}
