const ssugs = require(`../../Schemas/ssugsSchema.js`);
const { porcentaje } = require('../../utility/funciones.js');
const { ModalBuilder, EmbedBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits } = require('discord.js');
module.exports = {
	name: `interactionCreate`,
	async run(client, int) {

		if (!int.guild || !int.channel || !int.message || !int.user) return;
		let data = await ssugs.findOne({ message: int.message.id });
		if (!data) return;
		const embedit = () => {
			int.message.embeds[0].data.fields[0].value = `${data.yes.length} votos`;
			int.message.embeds[0].data.fields[1].value = `${data.no.length} votos`;

			int.message.embeds[0].data.fields[0].name = `Votos Positivos ${porcentaje(
				data.yes.length,
				data.yes.length + data.no.length
			)}%`;
			int.message.embeds[0].data.fields[1].name = `Votos Negativos ${porcentaje(
				data.no.length,
				data.yes.length + data.no.length
			)}%`;
		}


		if (int.customId === "yes") {
			if (data.yes.includes(int.user.id)) return int.reply({ content: `Ya votaste aqui`, ephemeral: true });
			if (data.no.includes(int.user.id)) data.no.splice(data.no.indexOf(int.user.id), 1);

			data.yes.push(int.user.id);
			data.save();
			embedit()
			await int.message.edit({ embeds: [int.message.embeds[0]] });
			int.deferUpdate();
		} else if (int.customId === "no") {
			if (data.no.includes(int.user.id)) return int.reply({ content: `Ya votaste aqui`, ephemeral: true });
			if (data.yes.includes(int.user.id)) data.yes.splice(data.yes.indexOf(int.user.id), 1);
			data.no.push(int.user.id);
			data.save();
			embedit()
			await int.message.edit({ embeds: [int.message.embeds[0]] });
			int.deferUpdate();
		} else if (int.customId === "edit") {
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
		} else if (int.customId === "delete") {
			if (!int.member.permissions.has(PermissionFlagsBits.Administrator)) return int.reply({ content: 'No tienes permiso para borrar esta sugerencia', ephemeral: true });
			int.message.delete();
			await ssugs.findOneAndDelete({ message: int.message.id });
		} 
		if (int.isModalSubmit()) {
			if (int.customId === `editor`) {
				const suggest = int.fields.getTextInputValue('newsuggest');
				int.message.embeds[0].data.description = suggest
				await int.message.edit({ embeds: [int.message.embeds[0]] });
			
				int.deferUpdate();
			}
		}

	}
};
