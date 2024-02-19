import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";

const invite: cmd = {
	name: "invite",
	alias: [],
	description: "Invitame a tu servidor",
	usage: "invite",
	userPerms: [],
	botPerms: [],
	isOwner: false,
	run: async (client, message) => {
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
			[
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel('Admin')
					.setURL(
						'https://discord.com/api/oauth2/authorize?client_id=924525977437077515&permissions=8&scope=applications.commands%20bot'
					)
					.setEmoji(`963550260863590492`),
				new ButtonBuilder()
					.setStyle(ButtonStyle.Link)
					.setLabel('Normal')
					.setEmoji('963553257303707650')
					.setURL(
						`https://discord.com/api/oauth2/authorize?client_id=924525977437077515&permissions=1644905889015&scope=bot%20applications.commands`
					)
			]
		);

		message.channel.send({
			embeds: [
				{
					title: `<:pat:963560169273458839> Invitame :D`,
					description:
						'<:yeah:930915658030522428> Quieres invitarme? aqui tienes 2 opciones :D',
					color: client.color
				}
			],
			components: [row]
		});
	}
};

export default invite;