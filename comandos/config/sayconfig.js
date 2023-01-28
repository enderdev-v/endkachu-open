const {  ChannelType } = require(`discord.js`);
const saySchema = require(`../../Schemas/saySchema`);
module.exports = {
	name: 'sayconfig',
	alias: [],
	description: 'Configura el comando say',
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],

	async run(client, message, args) {
		let canal = message.mentions.channels.first();
			let type = args[1];
		await saySchema.findOneAndUpdate(
						{ guild: message.guild.id },
			      { guild: message.guild.id },
						{ new: true, upsert: true }
					);

		let option = args[0];
		if (!option)
			return message.reply({
				embeds: [
					{
						title: 'Error',
						color: 0xbc0000,
						description: `no pusiste una opción \n opciones: antilinks, watermark, logs`
					}
				]
			});
		switch (option) {
			case 'watermark':
				
				if (!type)
					return message.reply({
						embeds: [
							{
								title: 'Error',
								color: 0xbc0000,
								description: `no pusiste una opción  \n opciones: footer, mention, none`
							}
						]
					});
				if (type === 'footer') {
					await saySchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ watermark: 'footer' },
						{ new: true, upsert: true }
					);
					message.reply({
						embeds: [
							{
								title: 'Watermark Colocada',
								color: 0x00c800,
								description: `${type} fue seleccionada correctamente`
							}
						]
					});
				} else if (type === 'mention') {
					await saySchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ watermark: 'mention' },
						{ new: true, upsert: true }
					);
					message.reply({
						embeds: [
							{
								title: 'Watermark colocada',
								color: 0x00c800,
								description: `${type} fue seleccionada correctamente`
							}
						]
					});
				} else if (type === 'none') {
					await saySchema.findOneAndUpdate(
						{ guild: message.guild.id },
						{ watermark: 'none' },
						{ new: true, upsert: true }
					);
					message.reply({
						embeds: [
							{
								title: 'Watermark removida',
								color: 0x00c800,
								description: `Se ha quitado la Watermark colocada anteriormente`
							}
						]
					});
				} else
					return message.reply({
						embeds: [
							{
								title: 'Error',
								color: 0xbc0000,
								description: `${
									args[2]
								} no es una opción valida \n opciones: mention, footer, none`
							}
						]
					});
				break;
			case 'logs':
					if (!canal || canal.type !== ChannelType.GuildText)
					return message.reply({
						embeds: [
							{
								title: 'Canal no valido',
								description: `canal de logs no valido`,
								color: 0xbc0000
							}
						]
					});
				await saySchema.findOneAndUpdate(
					{ guild: message.guild.id },
					{ logs: canal.id },
					{ new: true, upsert: true }
				);
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
			case 'antilinks':
					if (type === 'on') {
					await saySchema.findOneAndUpdate(
						{guild: message.guild.id },
						{ antilinks: true },
						{ new: true, upsert: true }
					);
					message.reply({
						embeds: [
							{
								title: 'Antilinks',
								color: 0x00c800,
								description: `Antilinks Prendido`
							}
						]
					});
				} else if (type === 'off') {
					await saySchema.findOneAndUpdate(
						{guild: message.guild.id },
						{ antilinks: false },
						{ new: true, upsert: true }
					);
					message.reply({
						embeds: [
							{
								title: 'Antilinks',
								color: 0x00c800,
								description: `Antilinks Apagado`
							}
						]
					});
				} else
					return message.reply({
						embeds: [
							{
								title: 'Opción no valids',
								color: 0xbc000,
								description: `${turn} no es una opción valida \n opciones: on, off`
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
							description: `${option} no es una opción valida \n opciones: antilinks, watermark, logs`
						}
					]
				});
				break;
		}
	}
};
