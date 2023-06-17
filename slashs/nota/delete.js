const { PermissionFlagsBits } = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);

module.exports = {
	subcommand: `note.delete`,
	async run(client, int) {
		let data = await noteSchema.findOne({
			guild: int.guild.id,
			user: int.member.id
		});

		if (data.notes.length === 0) return int.reply('No tienes notas');
		let nota = int.options.getNumber("id");

		if (nota < 0) return int.reply(`la id ${nota} no es valida`);
		if (isNaN(nota)) return int.reply(`la id ${nota} no es valida`);

		if (data.notes !== 'undefined' || data.notes !== null) {
			int.reply({
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
}

