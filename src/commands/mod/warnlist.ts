import { cmd } from "../../types/endkachu";
import warnSchema from "../../Schemas/warnSchema";
import { paginas, userGet } from "../../structures/functions";

const warns: cmd = {
    name: "listwarn",
    alias: [],
    description: "Muestra la lista de warns",
    usage: "listwarn",
    userPerms: ["Administrator"],
    botPerms: ["Administrator"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        if (!user) return message.reply(`¿cual es el usuario?`);

        const data = await warnSchema.findOne({ guild: message.guild.id, user: user.id });
        if (!data) return message.reply(`el usuario no tiene warns`);

        if (data.warns.length === 0)
            return message.reply(`el usuario no tiene warns`);


        paginas(message, 'Red', `${user.user.tag} tiene ${data.warns.length} warns`, 2, data.warns.map((warn, index) =>
            `--------------- \n ID: ${index} \n Fecha: <t:${Math.round(
                warn.fecha / 1000
            )}> \n autor <@${warn.autor}> \n razon: ${warn.razon}`
        ));
    }
};
export default warns;