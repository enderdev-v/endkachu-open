const Discord = require(`discord.js`);
const warnSchema = require(`../../Schemas/warnSchema`)

module.exports = {
  name: "warns",
  alias: [],
  description: `borra mensajes del canal en el que se ejecuta el comando n\ usa !clear {cantidad}`,
  userPerms: [`ManageGuild`],
  botPerms: [`ManageGuild`],

  async run(client, message, args) {


    let user = message.mentions.members.first();
    if (!user) return message.reply(`¿cual es el usuario?`)

    let data = await warnSchema.findOne({ guildId: message.guild.id })
    if (!data) return message.reply(`el usuario no tiene warns`)

    if (data.warns.length == 0) return message.reply(`el usuario no tiene warns`)


    let embed = new Discord.MessageEmbed()
      .setTitle(`${user.user.tag} tiene ${data.warns.length} warns`)
      .setDescription(`${data.warns.map((warn, index) => `--------------- \n ID: ${index} \n Fecha: <t:${Math.round(warn.fecha / 1000)}> \n autor @${warn.autor} \n razon: ${warn.razon}`)}`)
      .setColor(`Red`)

    message.channel.send({ embeds: [embed] })

  }
}