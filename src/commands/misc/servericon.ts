import { cmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";

const servericon: cmd = {
    name: "servericon",
    alias: [],
    description: "Muestra el icono del servidor",
    usage: "servericon",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {
        const embed = new EmbedBuilder()
            .setTitle(`Icono del servidor **${message.guild.name}**`)
            .setImage(message.guild.iconURL({ size: 1024, forceStatic: true, extension: `png` }))
            .setFooter({ text: `icono pedido por: ${message.author.username}` })
            .setColor(client.color);
        message.channel.send({ embeds: [embed] });
    }
}; 
export default servericon;