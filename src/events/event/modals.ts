import { ModalSubmitInteraction } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import sugSystem from "../../Schemas/sugSystem";
import { EmbedBuilder } from "discord.js";
const modals: DiscordEvent = {
    name: "interactionCreate",
    run: async (client, int: ModalSubmitInteraction) => {
        if (!int.isModalSubmit()) return;
        const data = await sugSystem.findOne({ message: int.message.id });
        if (!data) return;
        if (int.customId === `editor`) {
            const suggest = int.fields.getTextInputValue('newsuggest');
            const embed = new EmbedBuilder(int.message.embeds[0]).setDescription(suggest);
            await int.message.edit({ embeds: [embed] });
            int.deferUpdate();
        }

    }
};
export default modals;