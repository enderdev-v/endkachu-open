import { EmbedBuilder } from "discord.js";
import warnSchema from "../../Schemas/warnSchema";
import { cmd } from "../../types/endkachu";
import { userGet } from "../../structures/functions";

const warn: cmd = {
    name: "warn",
    alias: [],
    description: "Dale una advertencia al usuario",
    usage: "warn <usuario> <advertencia>",
    userPerms: ["Administrator"],
    botPerms: ["Administrator"],
    isOwner: false,
    run: async (client, message, args) => {
        const user = await userGet(message, args);
        if (!user) return message.reply(`¿cual es el usuario?`);
        
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puedes dar un warn a alguien igual o mayor rango que tu");
        if (user.user === client.user) return message.reply("I can't warn me");

        if (user.user === message.author) return message.reply("no te puedes dar un warn a ti mismo");
        await warnSchema.findOneAndUpdate(
            { guild: message.guild.id, user: user.id },
            { guild: message.guild.id, user: user.id },
            { new: true, upsert: true }
        );

        const razon = args.join(` `).slice(22);

        if (!razon) return message.reply(`¿cual es la razon?`);
        const embed = new EmbedBuilder()
            .setDescription(`**Warn a ${user}** \n ${razon}`)
            .setColor(0x297020);

        const objeto = {
            autor: message.author.id,
            fecha: Date.now(),
            razon
        };
        await warnSchema.findOneAndUpdate(
            { guild: message.guild.id, user: user.id },
            {
                $push: {
                    warns: objeto
                }
            },
            { new: true, upsert: true }
        );

        message.channel.send({ embeds: [embed] });

    }
};
export default warn;