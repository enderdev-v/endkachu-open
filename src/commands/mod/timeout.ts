import { userGet } from "../../structures/functions";
import { cmd } from "../../types/endkachu";
import ms from "ms";
const timeout: cmd = {
    name: "timeout",
    alias: [],
    description: "Aisla a un usuario especifico por un tiempo",
    usage: "timeout <user> <tiempo>",
    userPerms: ["ModerateMembers"],
    botPerms: ["ModerateMembers"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        
        const tiempo = args[1];
        const time = ms(tiempo);
        const muteReason = args[2];
        if (!user) return message.reply("no puedo mutear a nadie mencionalo");
        if (!tiempo) return message.reply("por cuanto tiempo dimelo");
        if (!muteReason) return ("debes decir por que lo voy a mutear");
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puede mutear a alguien igual o mayor rango que tu");
        if (user.user === message.author) return message.reply("no te puedes auto aislar");

        if (user?.isCommunicationDisabled()) return message.reply("el usuario ya esta aislado");
        
        try {
            await user.timeout(time, muteReason);
        } catch (e) {
            console.error(e);
        }

        message.channel.send(`el usuario ${user} fue muteado por ${tiempo} con la razon de ${muteReason}`);

    }
};
export default timeout;