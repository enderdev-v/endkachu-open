import { AttachmentBuilder, EmbedBuilder, TextChannel } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import byeSchema from '../../Schemas/byeSchema';

const bye: DiscordEvent = {
	name: "guildMemberRemove",
	run: async (client, member) => {
		const data = await byeSchema.findOne({ guild: member.guild.id });
		if (!data) return;

		// Imagenes
		


		const back = `https://media.discordapp.net/attachments/988614407930146906/1117566632223580160/IMG_20230611_153016.png`;
		// Canvas
		
		const attachment = new AttachmentBuilder(back, {
			name: 'bye.png'
		});
		if (data.channel) {
			const canal = member.guild.channels.cache.get(data.channel);
			const embed = new EmbedBuilder()
				.setTitle(
					'<:wow:963550260863590492> Adios <:wow:963550260863590492>'
				)
				.setDescription(
					`Se fue ${member.user.username
					} \n Que le vaya bien`
				)
				.setImage('attachment://bye.png')
				.setColor(0x008a59);
			if (canal instanceof TextChannel) {
				canal.send({ embeds: [embed], files: [attachment] });
			}
		}
	}
};

export default bye;