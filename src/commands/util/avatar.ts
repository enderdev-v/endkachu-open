import { cmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";
import { userGet } from "../../structures/functions";

const avatar: cmd = {
    name: "avatar",
    alias: [],
    description: "Muestra el avatar de un user",
    usage: "avatar [user]",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args) || message.member;
        const embed = new EmbedBuilder()
            .setTitle(`Avatar de **${user.user.username}**`)
            .setImage(user.user.displayAvatarURL({ size: 1024, forceStatic: true, extension: `png` }))
            .setFooter({ text: `avatar pedido por: ${message.author.username}` })
            .setColor(client.color);

        message.channel.send({ embeds: [embed] });
        
    }
};

export default avatar;