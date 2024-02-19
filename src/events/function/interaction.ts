import { ChatInputCommandInteraction, InteractionType } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";

const int: DiscordEvent = {
    name: "interactionCreate",
    run: async (client, int: ChatInputCommandInteraction) => {
        if (int.type !== InteractionType.ApplicationCommand) return;
        const slashcmd = client.slashcmds.get(int.commandName);
        if (!slashcmd) return;
        try {
            if (slashcmd.data.options.length === 0 || slashcmd.data.options[0].type > 2) {
                return await slashcmd.run(client, int);
            } else {
                const subcmd = client.subcmds.get(`${int.commandName}.${int.options.getSubcommand()}`);
                await subcmd.run(client, int);
            }
        } catch (e) {
            console.log(e);
        }
    }
};
export default int;