const { EmbedBuilder, PermissionFlagsBits } = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);

module.exports = {
	subcommand: `note.add`,
	async run(client, int) {
			await noteSchema.findOneAndUpdate(
			{ guild: int.guild.id, user: int.member.id },
			{ guild: int.guild.id, user: int.member.id },
			{ new: true, upsert: true }
		);
		let titulo = int.options.getString(`titulo`);
		let nota = int.options.getString(`nota`);

		let embed = new EmbedBuilder()
			.setTitle('Nota añadida')
			.setDescription(`La nota fue añadida correctamente`)
			.setColor(0x297020);

		let objeto = {
			titulo: titulo,
			fecha: Date.now(),
			nota
		};

		await noteSchema.findOneAndUpdate(
			{ guild: int.guild.id, user: int.member.id },
			{
				$push: {
					notes: objeto
				}
			},
			{ new: true, upsert: true }
		);

		int.reply({ embeds: [embed] });

	}
}