const Discord = require(`discord.js`);
const noteSchema = require("../../Schemas/noteSchema")
const { paginas } = require('../../utility/funciones.js');

module.exports = {
	name: 'list-note',
	alias: [],
	description: `Muestra las notas que hiciste de forma dinámica \n usa !notelist`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let data = await noteSchema.findOne({ guild: message.guild.id, user: message.author.id });
		if (!data) return message.reply(`no añadiste una nota`);
     		
		if (data.notes.length == 0) return message.reply(`no añadiste una nota`);    


		paginas(message, 0x3f7ede,
data.notes.map((note, index) =>
					`\n ————————》✧《————————— \n ID: ${index} \n Fecha: <t:${Math.round(
						note.fecha / 1000
					)}> \n Titulo: ${note.titulo} \n **Nota:** \n ${note.nota}`
			), `Notas de usuario ${message.author.username}`, 2
		);
	}
};
