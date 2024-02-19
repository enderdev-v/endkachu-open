import { ChannelType } from "discord.js";
import snipeSchema from "../../Schemas/snipeSchema";
import { cmd } from "../../types/endkachu";

const snipelogs: cmd = {
    name: "snipelogs",
    alias: [],
    description: "Configura el canal de logs del comando snipe",
    usage: "snipelogs <canal>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const canal = message.mentions.channels.first() ||  message.guild.channels.cache.get(args[0]);
        if (!canal || canal.type === ChannelType.GuildStageVoice || canal.type === ChannelType.GuildVoice) return message.reply({ embeds: [{ title: 'Canal no valido', description: `Ese canal no es válido o no existe en este servidor`, color: client.red }] });

        await snipeSchema.findOneAndUpdate(
            { guild: message.guild.id },
            { guild: message.guild.id, logs: canal.id },
            { new: true, upsert: true }
        );

        message.reply({ embeds: [{ title: `Canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: client.green }] });
    }
};
export default snipelogs;