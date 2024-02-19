import { ChannelType } from "discord.js";
import { cmd } from "../../types/endkachu";
import suggestSchema from "../../Schemas/suggestSchema";


const sugs: cmd = {
    name: "suggest-channel",
    alias: [],
    description: "Configura el canal de suggestion",
    usage: `suggest-channel <channel>`,
    userPerms: [`Administrator`],
    botPerms: [`Administrator`],
    isOwner: false,
    run: async (client, message, args) => {
        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!canal || canal.type === ChannelType.GuildStageVoice || canal.type === ChannelType.GuildVoice) return message.reply({ embeds: [{ title: 'Canal no valido', description: `Ese canal no es válido o no existe en este servidor`, color: client.red }] });

        await suggestSchema.findOneAndUpdate(
            { guild: message.guild.id },
            { guild: message.guild.id, channelId: canal.id },
            { new: true, upsert: true }
        );

        message.reply({ embeds: [{ title: `canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: client.green }] });

    }
};

export default sugs;