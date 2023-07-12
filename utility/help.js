const opts = [
					{
						label: 'Generales',
						description: 'comandos de información',
						value: 'general',
						emoji: '1044261055280463882'
					},
					{
						label: 'Moderación',
						description: 'comandos de moderación',
						value: 'mod',
						emoji: '1044253989803397120'
					},
					{
						label: 'Utilidad',
						description: 'comandos de moderacion',
						value: 'util',
						emoji: '1044251559988563978'
					},
					{
						label: 'Configuración',
						description: 'Comandos para configurar el bot',
						value: 'config',
						emoji: '1044251815258099722'
					},
					{
						label: 'Diversion',
						description: 'Comandos para diversion',
						value: 'funny',
						emoji: '1044251730889670787'
					},
					{
						label: 'Notas',
						description: 'Comandos de notas',
						value: 'notes',
						emoji: '1044261418427502643'
					},
					{
						label: 'Menu',
						description: 'regresa al lista de categorias',
						value: 'home',
						emoji: '1044251490677690441'
					}
				],
	general = {
	title: '<:epico:1044261418427502643> Comandos de Generales ',
	color: 0x3f7ede,
	description: `Comandos que son para cosas del bot para estar en una categoria aparte`,
	fields: [
		{
			name: '◦•≫ Comandos',
			value: `botinfo \n help \n ping \n invite \n reportbug`,
			inline: false
		}
	]
},
	mod = {
		title: '<:queno:1044253989803397120> Comandos de Moderación',
		color: 0x3f7ede,
		description: `Comandos para moderar tu discord con funciones simples y completas`,
		fields: [
			{
				name: `◦•≫ Comandos`,
				value:
					'ban \n kick \n tempban \n mute \n unmute \n clear \n hackban \n unban \n snipe \n warn \n unwarn \n warns',
				inline: false
			}
		]
	},
	util = {
		title: '<:oye:1044251559988563978> Comandos de Utilidad',
		color: 0x3f7ede,
		description: `Comandos que te seran utiles en el servidor`,
		fields: [
			{
				name: `◦•≫ Comandos`,
				value:
					'sayembed  \n serverinfo \n  userinfo \n suggest \n avatar \n servericon \n calc \n revive-chat',
				inline: false
			}
		]
	},
	config = {
		title: '<:wow:1044251815258099722> Comandos de Configuracion',
		color: 0x3f7ede,
		description: `Comandos que ayudan a que configuran y adaptan al bot a tus necesidades`,
		fields: [{
			name: `◦•≫ Comandos`,
			value:
				'setprefix \n setleaves \n setrevive \n sayconfig \n suggest-channel  \n setwelcome',
			inline: false
		}]
	},
	fun = {
		title: '<:divertido:1044251730889670787> Comandos de Diversion',
		color: 0x3f7ede,
		description: `Comandos que te divertiran y alegraran tu servidor`,
		fields: [
			{
				name: `◦•≫ Comandos`,
				value:
					'jumbo \n 8ball \n playgame \n game \n random \n say \n randomcolor \n create-meme \n achievement',
				inline: false
			}
		]
	},
	notes = {
		title: '<:interesante:1044261055280463882> Comandos de Musica',
		color: 0x3f7ede,
		description: `Comandos que te ayudarán a organizarte en el servidor con notas`,
		fields: [
			{
				name: `◦•≫Comandos `,
				value: 'addnote \n listnote \n deletenote \n fastnote \n noteperms',
				inline: false
			}
		]
	};
module.exports = { opts, general, mod, util, config, fun, notes }