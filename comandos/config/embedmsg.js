const Discord = require(`discord.js`);
const embedSchema = require('../../Schemas/embedSchema');
module.exports = {
	name: 'embedmsg',
	alias: [],
	description: 'Configura el mensaje embed de anuncio',
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		await embedSchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ guild: message.guild.id },
						{ new: true, upsert: true }
					);
		let option = args[0];
		if (!option)
			return message.reply({
				embeds: [
					{
						title: 'Error',
						color: 0xbc0000,
						description: `no pusiste una opción \n opciones: antilinks, watermark, logs`
					}
				]
			});

		switch (option) {
			case 'color':
				      let c = args[1];
				if (!c) return;
				await embedSchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ color: c },
						{ new: true, upsert: true }
					);
				break;
			case 'footer':
				let f = args.slice(1).join(" ")
				if (!f) return;
				await embedSchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ footer: f },
						{ new: true, upsert: true }
					);
				break;
			case 'message':
				let msg = args.slice(1).join(" ")
				if (!msg) return;
				await embedSchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ message: msg },
						{ new: true, upsert: true }
					);
				break;
			default:
				message.reply({
					embeds: [
						{
							title: 'Error',
							color: 0xbc0000,
							description: `${option} no es una opción valida \n opciones: color, message, message`
						}
					]
				});
				break;
		}
	}
};
