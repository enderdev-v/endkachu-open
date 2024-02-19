import { userGet } from "../../structures/functions";
import { cmd } from "../../types/endkachu";

const kick: cmd = {
    name: "kick",
    alias: [],
    description: "Saca a un usuario",
    usage: "ban <user>",
    userPerms: ["KickMembers"],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        const kickReason = args.slice(1).join(` `);
        if (!user) return message.reply("Debes mencionar a alguien!");
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puede kickear a alguien igual o mayor rango que tu");
        if (user.user === message.author) return message.reply("no te puedes auto kickear");
        if (user.user === client.user) return message.reply("I can't kick me");

        if (!kickReason) return message.reply("por que lo quiere kickear especificate");
        user.kick(kickReason);
        message.channel.send(`El usuario **${user}** fu kickeado por **${kickReason}** \n kickeado por enderBot`);

    }
};
export default kick;