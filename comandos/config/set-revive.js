const { ChannelType } = require('discord.js');
const reviveSchema = require('../../Schemas/reviveSchema');

module.exports = {
	name: 'setrevive',
	alias: [],
	description: `comando para configurar el comando revive-chat`,
	userPerms: [`ManageGuild`],
	botPerms: [`ManageGuild`],
	async run(client, message, args) {
		let data = await reviveSchema.findOne({ guild: message.guild.id });

		let option = args[0];
		if (!option)
			return message.reply({
				embeds: [
					{
						title: 'Error',
						color: 0xbc0000,
						description: `no pusiste una opción \n opciones: rol, channel`
					}
				]
			});

		switch (option) {
			case 'rol':
				let role = message.mentions.roles.first();
				if (!role)
					return message.reply({
						embeds: [
							{
								title: 'Hubo un error',
								description: 'no se encuentra o no mencionaste el rol'
							}
						]
					});

				if (!data?.role) {
					let newdata = new reviveSchema({
						role: role.id,
						guild: message.guild.id
					});
					return await newdata.save();
				}
				await reviveSchema.findOneAndUpdate({
					role: role.id,
					guild: message.guild.id
				});

				message.channel.send({
					embeds: [
						{
							title: `Rol establecido`,
							description: `<:check:963554878200901692> Rol:  ${role} establecido correctamente`,
							color: 0x00c800
						}
					]
				});

				break;
			case 'channel':
				let canal = message.mentions.channels.first();
				if (
					!canal ||
					canal.type === ChannelType.GuildStageVoice ||
					canal.type === ChannelType.GuildVoice
				) {
					return message.reply({
						embeds: [
							{
								title: 'Canal no valido',
								description: `Ese canal no es válido o no existe en este servidor`,
								color: 0xbc0000
							}
						]
					});
				}

				// if (canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: "Canal no valido", description: `Ese canal no existe`, color: 0xbc0000 }] });

				if (!data?.channel) {
					let newdata = new reviveSchema({
						channel: canal.id,
						guild: message.guild.id
					});
					return await newdata.save();
				}
				await reviveSchema.findOneAndUpdate({
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
