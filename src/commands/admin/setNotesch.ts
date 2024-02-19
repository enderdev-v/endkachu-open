import noteSchema from "../../Schemas/noteSchema";
import { cmd } from "../../types/endkachu";
import { ChannelType } from "discord.js";
const setnote: cmd = {
    name: "notechannel",
    alias: [],
    description: "Configura el canal de notas rapidas :D",
    usage: "notechannel <channel>",
    userPerms: ["ManageGuild"],
    botPerms: ["ManageGuild"],
    isOwner: false,
    run: async (client, message, args) => {
        const canal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!canal || canal.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: 'Canal no valido', description: `canal de Notas rapidas no valido`, color: client.red }] });

        await noteSchema.findOneAndUpdate(
            { guild: message.guild.id },
            { guild: message.guild.id, fastnotes: canal.id },
            { new: true, upsert: true }
        );
        message.reply({ embeds: [{ title: `Canal establecido`, description: `<:check:963554878200901692> Canal ${canal} establecido correctamente`, color: client.green }] });
    }
};
export default setnote;