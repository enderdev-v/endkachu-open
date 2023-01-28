const { EmbedBuilder } = require(`discord.js`);
const { ChannelType } = require("discord.js")

module.exports = {
  name: "serverinfo",
  alias: [],
  description: `muestra informacion del servidor`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {

    let nivel = { "0": "Ningúno", "1": "Bajo", "2": "Medio", "3": "Alto", "4": "Muy alto" }
    let bots = message.guild.members.cache.filter(member => member.user.bot).size;
    let usuarios = message.guild.members.cache.filter(member => !member.user.bot).size;
    let very = nivel[message.guild.verificationLevel]
    let texto = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size
    let voz = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size
    let cate = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size
    let stage = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size
    let foro = message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size

    
    let embed = new EmbedBuilder()
      .setTitle(`informacion de ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL())
      .setColor(0x06aed5)
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
      )

    message.channel.send({ embeds: [embed] })

  }

}