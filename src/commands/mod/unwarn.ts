
import warnSchema from "../../Schemas/warnSchema";
import { userGet } from "../../structures/functions";
import { cmd } from "../../types/endkachu";

const unwarn: cmd = {
    name: "unwarn",
    alias: [],
    description: "quitale una advertencia al usario",
    usage: "unwarn <user>",
    userPerms: ["Administrator"],
    botPerms: ["Administrator"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        if (!user) return message.reply(`¿cual es el usuario?`);

        const data = await warnSchema.findOne({ guild: message.guild.id, user: user.id });
        if (data.warns.length === 0) return message.reply("el usuario no tiene warns");
        const idwarn = Number(args[1]);

        if (idwarn < 0) return message.channel.send(`el numero de warn es invalido`);
        if (isNaN(idwarn)) return message.reply("escribe una cantidad  en numeros");


        if (data.warns.length === 0 || data.warns === undefined) return; 
            message.channel.send(`Se ha quitado el warn correctamente `);
            data.warns.splice(idwarn, 1);
            data.save();
        
    }
};
export default unwarn;