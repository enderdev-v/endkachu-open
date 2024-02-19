import { subcmd } from "../../types/endkachu";
// import { EmbedBuilder, PermissionFlagsBits } from "discord.js"
import noteSchema from "../../Schemas/noteSchema";

const deleted: subcmd = {
    subcommand: `note.delete`,
    async run(client, int) {
        const data = await noteSchema.findOne({
			guild: int.guild.id,
			user: int.member.user.id
		});

		if (data.notes.length === 0) return int.reply('No tienes notas');
		const nota = int.options.getNumber("id");

		if (nota < 0) return int.reply(`la id ${nota} no es valida`);
		if (isNaN(nota)) return int.reply(`la id ${nota} no es valida`);

		if (data.notes !== undefined || data.notes !== null) {
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
};
export default deleted;