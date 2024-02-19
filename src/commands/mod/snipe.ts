/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmbedBuilder, TextChannel } from "discord.js";
import snipeSchema from "../../Schemas/snipeSchema";
import { cmd } from "../../types/endkachu";

const snipe: cmd = {
    name: "snipe",
    alias: [],
    description: "Checa que mensajes fueron borrados anteriormente",
    usage: "snipe",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {
        const data = await snipeSchema.findOne({ channelId: message.channel.id });
        if (!data) return message.reply(`no se a borrado ningun mensaje todavia`);

        const embed = new EmbedBuilder()
            .setTitle(`Mensaje borrado de ${data.author}`)
            .setColor(0x3f7ede)
            .setDescription(`${data.message}`)
            .addFields(
                {
                    name: `Canal`,
                    value: `<#${data.channel}>`,
                    inline: false
                },
                {
                    name: `Hora y Dia`,
                    value: `<t:${data.time}> \n <t:${data.time}:R>`,
                    inline: false
                }
            );
        message.channel.send({ embeds: [embed] });

         const canal = await message.guild.channels.fetch(data.logs);

         if (canal instanceof TextChannel) {
            canal.send({ embeds: [embed] });
         }
    }
};

export default snipe;