const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
	name: 'invite',
	alias: [],
	description: `muestra la invitacion del bot`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let row = new ActionRowBuilder().addComponents(
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

		const msg = await message.channel.send({
			embeds: [
				{
					title: `<:pat:963560169273458839> Invitame :D`,
					description:
						'<:yeah:930915658030522428> Quieres invitarme? aqui tienes 2 opciones :D',
					color: 0x3f7ede,
				//	thumbnail: `${client.user.displayAvatarURL()}`
				}
			],
			components: [row]
		});
	}
};
