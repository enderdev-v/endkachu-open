import { userGet } from "../../structures/functions";
import { cmd } from "../../types/endkachu";
import ms from "ms";

const ban: cmd = {
    name: "ban",
    alias: [],
    description: "Banea a un usuario especifico",
    usage: "ban <user>",
    userPerms: ["BanMembers"],
    botPerms: ["BanMembers"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        if (!user) return message.reply("Debes mencionar a alguien!");
        if (user.user === message.author) return message.reply("no te puedes banear a ti mismo");
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puedes banear a alguien igual o mayor rango que tu");
        if (user.user === client.user) return message.reply("I can't ban me");        
        let reason = args.slice(2).join(" ") ? args.slice(2).join(" ") : "no se a especificado una razon";
        const tiempo = args[1];
        const regex = /\d+[sdm]/;

        if (!reason) return message.reply("cual es la razon del baneo al usuario");
        if (regex.test(tiempo)) {
            console.log("funque tempban");

            const time = ms(tiempo);
            await user.ban({ reason: `${reason}, por un tiempo de ${tiempo}` });
            message.channel.send({ embeds: [{ title: `Usuario Baneado`, description: `El usuario **${user.user.tag}** fue baneado temporalmente ${tiempo} por **${reason}**`, color: 0x3f7ede }] });
            setTimeout(() => {
                return message.guild.members.unban(user);
            }, time);
        } else {
            reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "no se a especificado una razon";  
            await user.ban({ reason: reason });
            message.channel.send({ embeds: [{ title: `Usuario Baneado`, description: `El usuario **${user.user.tag}** fue baneado por **${tiempo + reason}**`, color: 0x3f7ede }] });
        }
    }
};
export default ban;