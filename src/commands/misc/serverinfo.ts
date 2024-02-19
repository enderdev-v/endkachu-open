import { ChannelType, EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";

const serverinfo: cmd = {
    name: "serverinfo",
    alias: [],
    description: "Displays information about the server",
    usage: "serverinfo",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {
        const nivel = { "0": "Ningúno", "1": "Bajo", "2": "Medio", "3": "Alto", "4": "Muy alto" };
        const bots = message.guild.members.cache.filter(member => member.user.bot).size;
        const usuarios = message.guild.members.cache.filter(member => !member.user.bot).size;
        const very = nivel[message.guild.verificationLevel];
        const texto = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
        const voz = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;
        const cate = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size;
        const stage = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size;
        const foro = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size;

        const embed = new EmbedBuilder()
            .setTitle(`informacion de ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL())
            .setColor(client.color)
            .addFields(
                {
                    name: `**Owner:**`,
                    value: `__${await message.guild.fetchOwner()}__`,
                    inline: false
                },
                {
                    name: `**Se creo:**`,
                    value: `${message.guild.createdAt.toLocaleDateString()}`,

                },
                {
                    name: "```Usuarios```",
                    value: `> Miembros en total: **${message.guild.memberCount}** \n > Usuarios: **${usuarios}** \n > Bots: ${bots}`,
                    inline: true
                },
                {
                    name: "```Stats```",
                    value: `> Roles: ${message.guild.roles.cache.size} \n > Nivel Verificacion: ${very} \n > Canales de texto: ${texto} \n > Canales de voz: ${voz} \n > Canales de escenario: ${stage} \n > Categorias: ${cate} \n > Foros: ${foro}`,
                    inline: true
                }
            );

        message.channel.send({ embeds: [embed] });
    }
};

export default serverinfo;