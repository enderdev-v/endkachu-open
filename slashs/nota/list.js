const Discord = require(`discord.js`);
const noteSchema = require("../../Schemas/noteSchema")
const { paginas } = require('../../utility/funciones.js');

module.exports = {
	subcommand: `note.list`,
	async run(client, int) {
		let data = await noteSchema.findOne({ guild: int.guild.id, user: int.member.id });
		if (!data) return int.reply(`no añadiste una nota`);



		if (data.notes.length == 0) return int.reply(`no añadiste una nota`);

    int.reply({ embeds: [{ title: `Lista de notas`, description: `La lista de notas fue mandada correctamente`, color: 0x3f7ede }], ephemeral: true })

		paginas(
			int,
			0x3f7ede,
			data.notes.map(
				(note, index) =>
					`\n ————————》✧《————————— \n ID: ${index} \n Fecha: <t:${Math.round(
						note.fecha / 1000
					)}> \n Titulo: ${note.titulo} \n **Nota:** \n ${note.nota}`
			),
			`Notas de usuario ${int.member}`,
			2
		);
	}

}