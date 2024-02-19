import { ActionRowBuilder, ButtonInteraction, ModalBuilder, PermissionFlagsBits, TextInputBuilder, TextInputStyle } from "discord.js";
import sugSystem from "../../Schemas/sugSystem";
import { DiscordEvent } from "../../types/endkachu";

const sugs: DiscordEvent = {
    name: "interactionCreate",
    run: async (client, int: ButtonInteraction) => {
        if (!int.guild || !int.channel || !int.message || !int.user) return;
        const data = await sugSystem.findOne({ message: int.message.id });
        if (!data) return;
        const embedit = () => {
            int.message.embeds[0].data.fields[0].value = `${data.yes.length} votos`;
            int.message.embeds[0].data.fields[1].value = `${data.no.length} votos`;

            int.message.embeds[0].data.fields[0].name = `Votos Positivos ${data.yes.length / data.yes.length + data.no.length * 100}%`;
            int.message.embeds[0].data.fields[1].name = `Votos Negativos ${data.no.length / data.yes.length + data.no.length * 100}%`;
        };
        /* let d = divide / num * 100 */


        if (int.customId === "yes") {
            if (data.yes.includes(int.user.id)) return int.reply({ content: `Ya votaste aqui`, ephemeral: true });
            if (data.no.includes(int.user.id)) data.no.splice(data.no.indexOf(int.user.id), 1);

            data.yes.push(int.user.id);
            data.save();
            embedit();
            await int.message.edit({ embeds: [int.message.embeds[0]] });
            int.deferUpdate();
        } else if (int.customId === "no") {
            if (data.no.includes(int.user.id)) return int.reply({ content: `Ya votaste aqui`, ephemeral: true });
            if (data.yes.includes(int.user.id)) data.yes.splice(data.yes.indexOf(int.user.id), 1);
            data.no.push(int.user.id);
            data.save();
            embedit();
            await int.message.edit({ embeds: [int.message.embeds[0]] });
            int.deferUpdate();
        } else if (int.customId === "edit") {
            if (int.member.user.id !== data.author) return;
            const editar = new ModalBuilder()
                .setTitle(`Editar Sugerencia`)
                .setCustomId(`editor`)
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(
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
            if (!int.memberPermissions.has(PermissionFlagsBits.Administrator)) return int.reply({ content: 'No tienes permiso para borrar esta sugerencia', ephemeral: true });
            int.message.delete();
            await sugSystem.findOneAndDelete({ message: int.message.id });
        }

    }
};

export default sugs;