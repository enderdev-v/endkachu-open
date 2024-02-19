import { ActionRowBuilder, ButtonBuilder, ButtonStyle,  ForumChannel, TextChannel } from "discord.js";
import suggestSchema from "../../Schemas/suggestSchema";
import { cmd } from "../../types/endkachu";
import sugSystem from "../../Schemas/sugSystem";

const suggest: cmd = {
    name: "suggest",
    alias: [],
    description: "Sugiere una cosa a este servidor",
    usage: "suggest <sugerencia>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const data = await suggestSchema.findOne({ guild: message.guild.id });
        if (!data) return message.channel.send(`no se establecio un canal o no existe`);

        const canal = message.guild.channels.cache.get(data.channelId);

        if (!canal) return message.channel.send(`no se establecio un canal o no existe`);

        const suggest = args.join(` `);
        if (!suggest) return message.reply(`no pusiste la sugerencia`);

        const botones = new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setEmoji(`963554878200901692`)
                .setCustomId('yes'),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setEmoji(`963554998321545286`)
                .setCustomId('no'),
            new ButtonBuilder()
                .setLabel('editar')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('📝')
                .setCustomId('edit'),
            new ButtonBuilder()
                .setLabel('eliminar')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🗑️')
                .setCustomId('delete')
        ]);
        const embed = {
            title: `Nueva sugerencia`,
            thumbnail: { url: `${message.author.displayAvatarURL()}` },
            description: suggest,
            color:  client.color,
            fields: [
                {
                    name: 'Votos Positivos 0%',
                    value: '0 votos'
                },
                {
                    name: `Votos Negativos 0%`,
                    value: '0 votos'
                }
            ],
            footer: {
                text: `Sugerencia hecha por ${message.author.tag}`
            }
        };
        function update(msg): void {
            const sugs = new sugSystem({
                message: msg.id,
                author: message.author.id
            });
            sugs.save();
        } 
        message.reply(`sugerencia enviada`);
        if (canal instanceof TextChannel) {
            const msg = await canal.send({ embeds: [embed], components: [botones] });
            update(msg);
        } else if (canal instanceof ForumChannel) {
            const msg = await canal.threads.create({
                name: 'Nueva Sugerencia',
                message: { embeds: [embed], components: [botones] }
            });    
            update(msg);
        }
        
    }
};

export default suggest;