import noteSchema from "../../Schemas/noteSchema";
import { cmd } from "../../types/endkachu";

const deltnote: cmd = {
	name: "notedelete",
	alias: [],
	description: "Elimina una nota de tu lista",
	usage: "notedelete <id>",
	userPerms: [],
	botPerms: [],
	isOwner: false,
	run: async (client, message, args) => {
		const data = await noteSchema.findOne({
			guild: message.guild.id,
			user: message.author.id
		});

		if (data.notes.length === 0) return message.reply('No tienes notas');
		const nota = args[0];

		if (Number(nota) < 0) return message.channel.send(`la id ${nota} no es valida`);
		if (isNaN(Number(nota))) return message.reply(`la id ${nota} no es valida`);

		if (data.notes !== undefined || data.notes !== null) {
			message.channel.send({
				embeds: [
					{
						title: 'Nota removida',
						description: 'La nota se a removido correctamente',
						color: client.green
					}
				]
			});
			data.notes.splice(Number(nota), 1);
			data.save();
		}
	}
}; 
export default deltnote;