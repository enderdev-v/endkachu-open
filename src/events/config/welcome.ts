import { AttachmentBuilder, EmbedBuilder, TextChannel } from "discord.js";
import welcomeSchema from "../../Schemas/welcomeSchema";
import { DiscordEvent } from "../../types/endkachu";

const welcome: DiscordEvent = {
	name: "guildMemberAdd",
	run: async (client, member) => {
		// const image = { width: 1200, height: 675 };
		const data = await welcomeSchema.findOne({ guild: member.guild.id });
		if (!data) return;

		// Imagenes

		const back = "https://cdn.discordapp.com/attachments/988614407930146906/1192195459121418400/OIP.png?ex=65a8318b&is=6595bc8b&hm=9ff96826c3907e95c004249668105bf8391edd3f171f57bf37574e486c156d0b&";
		

		const attachment = new AttachmentBuilder(back, { name: 'welcome.png' });
		if (data.channel) {
			const canal = member.guild.channels.cache.get(data.channel);
			const embed = new EmbedBuilder()
				.setTitle('<:wow:963550260863590492> Bienvenida')
				.setDescription(data.message ?? `Demosle la bienvenida a ${member.user.username} \n Pasatela Bien <:wow:963550260863590492>`)
				.setImage('attachment://welcome.png')
				.setColor(0x008a59);
			if (canal instanceof TextChannel) {
				canal.send({ embeds: [embed], files: [attachment] });
			}
		}

	}
};

export default welcome;