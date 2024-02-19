import noteSchema from "../../Schemas/noteSchema";
import { DiscordEvent } from "../../types/endkachu";
const notes: DiscordEvent = {
	name: 'messageCreate',
	async run(client, msg) {
		const canal = await noteSchema.findOne({ guild: msg.guild.id });
		if (!canal) return;
		if (msg.channel.id !== canal.fastnotes) return;
		const file = msg.attachments.first();
		const texto = !msg.content
			? 'No se adjunto un texto a esta nota'
			: msg.content;
		if (msg.author.bot) return;
		const embed = {
			color: 0xfffff,
			title: `**Nota Rapida**`,
			description: msg.content,
			footer: { text: `${new Date().toLocaleString()}` }
		};

		msg.delete();
		if (file) {
			const embed2 = {
				color: 0xfffff,
				title: `**Nota Rápida con archivos**`,
				description: texto,
				footer: { text: `${new Date().toLocaleString()}` }
			};

			msg.channel.send({ files: [...msg.attachments.values()] });
			msg.channel.send({ embeds: [embed2], content: 'Nota con archivos' });
		} else {
			msg.channel.send({ embeds: [embed] });
		}
	}
};

export default notes;