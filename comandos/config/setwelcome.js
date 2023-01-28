const { ChannelType } = require(`discord.js`);
const welcomeSchema = require('../../Schemas/welcomeSchema');
module.exports = {
	name: 'setwelcome',
	alias: [],
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],

	async run(client, message, args) {
		let option = args[0];

		if (!option)
			return message.reply({
				embeds: [
					{
						title: 'Error',
						color: 0xbc0000,
						description: `no pusiste una opción \n opciones: channel, message`
					}
				]
			});
		switch (option) {
			case 'channel':
				let canal = message.mentions.channels.first();
				if (!canal || canal.type !== ChannelType.GuildText)
					return message.reply({
						embeds: [
							{
								title: 'Canal no valido',
								description: `canal de bienvenidas no valido`,
								color: 0xbc0000
							}
						]
					});

				let data = await welcomeSchema.findOne({ guildId: message.guild.id });

				if (!data) {
					let newdata = new welcomeSchema({
						channel: canal.id,
						guild: message.guild.id
					});
					return await newdata.save();
				}
				await welcomeSchema.findOneAndUpdate({
					channel: canal.id,
					guild: message.guild.id
				});

				message.reply({
					embeds: [
						{
							title: `canal establecido`,
							description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`,
							color: 0x00c800
						}
					]
				});

				break;
			case 'message':
				let msg = args.slice(1).join(' ');
				message.channel.send(msg);
				break;
			default:
				message.reply({
					embeds: [
						{
							title: 'Error',
							color: 0xbc0000,
							description: `${option} no es una opción valida \n opciones: channel, message`
						}
					]
				});

				break;
		}
	}
};
