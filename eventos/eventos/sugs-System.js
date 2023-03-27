const ssugs = require(`../../Schemas/ssugsSchema.js`);
const { porcentaje } = require('../../utility/funciones.js');
const {
	ModalBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	TextInputBuilder,
	TextInputStyle,
	PermissionFlagsBits
} = require('discord.js');
module.exports = {
	name: `interactionCreate`,
	async run(client, int) {
		try {
			if (!int.guild || !int.channel || !int.message || !int.user) return;
			let data = await ssugs.findOne({ message: int.message.id });
			if (!data) return;

			switch (int.customId) {
				case 'yes':
					{
						if (data.yes.includes(int.user.id))
							return int.reply({
								content: `Ya votaste aqui`,
								ephemeral: true
							});
						if (data.no.includes(int.user.id))
							data.no.splice(data.no.indexOf(int.user.id), 1);
						data.yes.push(int.user.id);
						data.save();

						int.message.embeds[0].fields[0].value = `${data.yes.length} votos`;
						int.message.embeds[0].fields[1].value = `${data.no.length} votos`;

						int.message.embeds[0].fields[0].name = `Votos Positivos ${porcentaje(
							data.yes.length,
							data.yes.length + data.no.length
						)}%`;
						int.message.embeds[0].fields[1].name = `Votos Negativos ${porcentaje(
							data.no.length,
							data.yes.length + data.no.length
						)}%`;

						await int.message.edit({
							embeds: [int.message.embeds[0]]
						});
						int.deferUpdate();
					}
					break;
				case 'no':
					{
						if (data.no.includes(int.user.id))
							return int.reply({
								content: `Ya votaste aqui`,
								ephemeral: true
							});
						if (data.yes.includes(int.user.id))
							data.yes.splice(data.yes.indexOf(int.user.id), 1);
						data.no.push(int.user.id);
						data.save();

						int.message.embeds[0].fields[0].value = `${data.yes.length} votos`;
						int.message.embeds[0].fields[1].value = `${data.no.length} votos`;

						int.message.embeds[0].fields[0].name = `Votos Positivos ${porcentaje(
							data.yes.length,
							data.yes.length + data.no.length
						)}%`;
						int.message.embeds[0].fields[1].name = `Votos Negativos ${porcentaje(
							data.no.length,
							data.yes.length + data.no.length
						)}%`;

						await int.message.edit({
							embeds: [int.message.embeds[0]]
						});
						int.deferUpdate();
					}
					break;
				case `edit`:
					{
						if (int.member.id !== data.author) return;
						const editar = new ModalBuilder()
							.setTitle(`Editar Sugerencia`)
							.setCustomId(`editor`)
							.addComponents(
								new ActionRowBuilder().addComponents(
									new TextInputBuilder()
										.setLabel('edita tu sugerencia')
										.setCustomId('newsuggest')
										.setStyle(TextInputStyle.Paragraph)
										.setPlaceholder('Introduce la nueva sugerencia')
										.setMinLength(10)
										.setMaxLength(200)
										.setRequired(true)
								)
							);

						await int.showModal(editar);
					}
					break;
				case 'delete':
					if (!int.member.permissions.has(PermissionFlagsBits.Administrator))
						return int.reply({
							content: 'No tienes permiso para borrar esta sugerencia',
							ephemeral: true
						});
					int.message.delete();
					await ssugs.findOneAndDelete({ message: int.message.id });
	
					break;
				default:
					break;
			}
			if (int.isModalSubmit()) {
				if (int.customId === `editor`) {
					const suggest = int.fields.getTextInputValue('newsuggest');
					//	int.message.embeds[0].description = `${suggest}`;
					await int.message.edit({
						embeds: [
							{
								title: `Nueva sugerencia`,

								thumbnail: { url: `${int.member.displayAvatarURL()}` },
								description: suggest,
								color: 0x00b5be,
								fields: [
									{
										name: int.message.embeds[0].fields[0].name,
										value: int.message.embeds[0].fields[0].value
									},
									{
										name: int.message.embeds[0].fields[1].name,
										value: int.message.embeds[0].fields[1].value
									}
								],
								footer: {
									text: int.message.embeds[0].footer.text
								}
							}
						]
					});
					int.deferUpdate();
				}
			}
		} catch (e) {
			console.error(e);
		}
	}
};
