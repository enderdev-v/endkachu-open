import { TextChannel } from "discord.js";
import { cmd } from "../../types/endkachu";

const clear: cmd = {
    name: "clear",
    alias: ["c"],
    description: "Clears the chat",
    usage: "clear",
    userPerms: ["ManageMessages"],
    botPerms: ["ManageMessages"],
    isOwner: false,
    run: async (client, message, args) => {
        const cantidad = args[0];

        if (!cantidad) return message.reply("escribe una cantidad");
        if (Number(cantidad) < 0) return message.reply(`esa cantidad tiene que ser mayor a 0`);
        if (Number(cantidad) >= 100) return message.reply(`esa cantidad excede mis limites`);
        if (isNaN(Number(cantidad))) return message.reply("escribe una cantidad  en numeros");


        try {
            if (message.channel instanceof TextChannel) {
                await message.channel.bulkDelete(Number(cantidad) + 1, true);
                await message.channel.send(`acabo de eliminar ${cantidad} mensajes`).then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 6000);
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
};

export default clear;