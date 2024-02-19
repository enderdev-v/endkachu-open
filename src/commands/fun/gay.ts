import { EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";
import { userGet } from "../../structures/functions";

const gay: cmd = {
    name: "gay",
    alias: [],
    description: "es gay el usuario?",
    usage: "say [user]",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args) || message.member;
        const num = Math.floor(Math.random() * 100);
        const embed = new EmbedBuilder()
            .setTitle("Es gay?")
            .setColor(client.color)
            .setDescription(`${user.user.username} es ${num}% gay, wow`);
            message.channel.sendTyping;
        await message.channel.send({ embeds: [embed] });
       
    }
};

export default gay;