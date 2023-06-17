const { PermissionFlagsBits } = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);
// const {  } = require(`../../utility/funciones`)

module.exports = {
	name: 'delete-note',
	alias: [],
	description: `Borra una nota de tu lista \n usa !delete-note {idnota}`,
	userPerms: [`Administrator`],
	botPerms: [`Administrator`],

	async run(client, message, args) {
		let data = await noteSchema.findOne({
			guild: message.guild.id,
			user: message.author.id
		});

		if (data.notes.length === 0) return message.reply('No tienes notas');
		let nota = args[0];

		if (nota < 0) return message.channel.send(`la id ${nota} no es valida`);
		if (isNaN(nota)) return message.reply(`la id ${nota} no es valida`);

		if (data.notes !== 'undefined' || data.notes !== null) {
			message.channel.send({
				embeds: [
					{
						title: 'Nota removida',
						description: 'La nota se a removido correctamente',
						color: 0x3f7ede
					}
				]
			});
			data.notes.splice(nota, 1);
			data.save();
		}
	}
};
