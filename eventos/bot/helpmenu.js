const Discord = require(`discord.js`);

module.exports = {
	name: `interactionCreate`,
	async run(client, int) {
		if (!int.isSelectMenu) return;
		if (int.customId !== `menu`) return;
		let embed = new Discord.EmbedBuilder()
			.setTitle('✨ Hola soy  endkachu✨')
			.setColor(0x01a0a1)
			.setDescription(
				'te brindo una lista de todas las categorías de comandos que yo tengo '
			)
			.addFields({
				name: '◦•≫ Categorias',
				value:
					'<:epico:1044261418427502643> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n  <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas \n <:interesante:963559201584607373> Musica',
				inline: false
			});
		let general = {
			title: '<:epico:1044261418427502643> Comandos de Generales ',
			color: 0x01a0a1,
			description: `Comandos que son para cosas del bot para estar en una categoria aparte`,
			fields: [
				{
					name: '◦•≫ Comandos',
					value: `botinfo \n help \n ping \n invite \n reportbug`,
					inline: false
				}
			]
		};

		let mod = {
			title: '<:queno:1044253989803397120> Comandos de Moderación',
			color: 0x01a0a1,
			description: `Comandos para moderar tu discord con funciones simples y completas`,
			fields: [
				{
					name: `◦•≫ Comandos`,
					value:
						'ban \n kick \n tempban \n mute \n unmute \n clear \n hackban \n unban \n snipe \n warn \n unwarn \n warns',
					inline: false
				}
			]
		};
		let util = {
			title: '<:oye:1044251559988563978> Comandos de Utilidad',
			color: 0x01a0a1,
			description: `Comandos que te seran utiles en el servidor`,
			fields: [
				{
					name: `◦•≫ Comandos`,
					value:
						'sayembed  \n serverinfo \n  userinfo \n suggest \n avatar \n servericon \n calc \n revive-chat',
					inline: false
				}
			]
		};
		let config = {
			title: '<:wow:1044251815258099722> Comandos de Configuracion',
			color: 0x01a0a1,
			description: `Comandos que ayudan a que configuran y adaptan al bot a tus necesidades`,
			fields: {
				name: `◦•≫ Comandos`,
				value:
					'set-prefix \n setleaves \n setrevive \n sayconfig \n embedmsg \n suggest-channel  \n setwelcome',
				inline: false
			}
		};
		let fun = {
			title: '<:divertido:1044251730889670787> Comandos de Diversion',
			color: 0x01a0a1,
			description: `Comandos que te divertiran y alegraran tu servidor`,
			fields: [
				{
					name: `◦•≫ Comandos`,
					value:
						'jumbo \n 8ball \n playgame \n game \n random \n say \n randomcolor \n create-meme \n achievement',
					inline: false
				}
			]
		};
		let notes = {
			title: '<:interesante:1044261055280463882> Comandos de Musica',
			color: 0x01a0a1,
			description: `Comandos que te ayudarán a organizarte en el servidor con notas`,
			fields: [
				{
					name: `◦•≫Comandos `,
					value: 'addnote \n listnote \n deletenote \n fastnote \n noteperms',
					inline: false
				}
			]
		};
		switch (int.values[0]) {
			case `general`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [general] });
				break;
			case `mod`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [mod] });
				break;
			case `util`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [util] });
				break;
			case `config`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [config] });
				break;
			case `funny`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [fun] });
				break;
			case `notes`:
				await int.deferUpdate();
				await int.message.edit({ embeds: [notes] });
				break;
			default:
				await int.deferUpdate();
				await int.message.edit({ embeds: [embed] });

				break;
		}
	}
};
