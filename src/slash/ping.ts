import { slashcmd } from "../types/endkachu";
import { SlashCommandBuilder } from "discord.js";
const ping: slashcmd = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Muestra la latencia del bot"),
    run: async (client, int) => {
        await int.reply({ embeds: [{ title: "Ping", description: `<:interesante:963559201584607373> API Pong! ${client.ws.ping}ms \n <:interesante:963559201584607373> Message Pong! ${Date.now() - int.createdTimestamp}ms`, color: client.color }]});
    }
};
export default ping;