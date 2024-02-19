import { cmd } from "../../types/endkachu";
import { ButtonBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";

const botinfo: cmd = {
    name: 'botinfo',
    alias: [],
    description: `Informacion de endkachu`,
    usage: '!botinfo',
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) =>{

        const embed = new EmbedBuilder()
            .setTitle('**Informacion de endkachu**')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.color)
            .setDescription(
                'hola soy **endkachu!** \n* Un bot que tiene el labor de hacer que te la pases bien en discord '
            )
            .addFields(
                {
                    name: `Prefix:`,
                    value: `**!**`,
                    inline: false
                },
                {
                    name: `Lenguaje:`,
                    value: '```ts\n "Typescript" \n```',
                    inline: false
                },
                {
                    name: `Creador:`,
                    value: `**endercrack**`,
                    inline: false
                },
                {
                    name: `Dessarrolladores:`,
                    value: `**endercrack** \n **themurft**`,
                    inline: false
                },
                {
                    name: `Creación del bot:`,
                    value: `${client.user.createdAt.toLocaleDateString()}`,
                    inline: false
                },
                {
                    name: '**Librerias:**',
                    value: `* Discord.js **v14.11.0** \n* MongoDB **6.7.3** \n* Canvas **2.10.0**`,
                    inline: true
                },
                {
                    name: `**Stats**`,
                    value: `> **Servidores:** **__${client.guilds.cache.size}__** \n> **Usuarios:** **__${client.users.cache.size}__** \n> **Canales:** **__${client.channels.cache.size}__**`,
                    inline: true
                }
            );

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents([
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Discord')
                    .setURL('https://discord.gg/PHNGpjh4jc')
                    .setEmoji('1044251490677690441'),

                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Website')
                    .setURL('https://endkachu.vercel.app')
                    .setEmoji('1044251559988563978')
            ]);

        await message.channel.send({ embeds: [embed], components: [row] });
    }
};

export default botinfo;