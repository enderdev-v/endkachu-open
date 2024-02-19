import { userGet } from "../../structures/functions";
import { cmd } from "../../types/endkachu";

const untimeout: cmd = {
    name: "untimeout",
    alias: [],
    description: "Quita del aislamiento a un usuario",
    usage: "untimeout <user>",
    userPerms: ["ModerateMembers"],
    botPerms: ["ModerateMembers"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
       if(!user) return message.reply("no puedo mutear a nadie mencionalo");
       if(!user.isCommunicationDisabled()) return message.reply("el usuario ya esta muteado");
       user.timeout(null);
    
        message.channel.send(`el usuario ${user} fue desmuteado`);
    
    }
};
export default untimeout;