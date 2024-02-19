import { EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";

const sayembed: cmd = {
    name: "sayembed",
    alias: [],
    description: "Crea tu propio embed y mandalo",
    userPerms: ["Administrator"],
    botPerms: ["Administrator"],
    usage: "sayembed <title> <description>",
    isOwner: false,
    run: async (client, message, args) => {
        const texto = args.slice(1).join(" "),
            title = args[0];

        if (!texto) return message.channel.send("que escribo en el anuncio");
        if (!title) return message.channel.send("que escribo en el anuncio");

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setThumbnail(message.guild.iconURL())
            .setColor(client.color)
            .addFields({
                name: "Anuncio:",
                value: texto,
                inline: false
            })
            .setFooter({ text: `Servidor ${message.guild.name}` });

        message.channel.send({ embeds: [embed] });
    }
};

export default sayembed;