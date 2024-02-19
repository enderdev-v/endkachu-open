import { Message } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import prefixSchema from "../../Schemas/prefixSchema";


const mention: DiscordEvent = {
    name: "messageCreate",
    run: async (client, msg: Message) => {
        const data = await prefixSchema.findOne({ guild: msg.guild.id });
        const prefix = !data || !data.prefix ? "!" : data.prefix;

        if (!msg.content.startsWith(`<@${client.user.id}>`)) return;
        if (msg.author.bot) return;
        msg.reply({ embeds: [{ title: `Hola soy endkachu!`, description: `- ***El prefix de este servidor es: **${prefix}** *** \n- ***Usa ${prefix}help, para obtener mis comandos***`, color: 0x3f7ede }] });

    }
};

export default mention;