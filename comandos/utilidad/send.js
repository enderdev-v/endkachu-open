const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "sayembed",
  alias: [],
  description: `muestra informacion del usuario en embed usa !sayembed {titulo} {info} `,
  userPerms: [`Administrator`],
  botPerms: [`Administrator`],

  async run(client, message, args) {

    let texto = args.slice(1).join(" ")


    if (!texto) return message.channel.send("que escribo en el anuncio")

    let title = args[0]

    if (!title) return message.channel.send("que escribo en el anuncio")



    let embed = new Discord.EmbedBuilder()
      .setTitle(title)
      .setThumbnail(message.guild.iconURL())
      .setColor(0x050cd9)
      .addFields(
        {
          name: "Anuncio:",
          value: texto,
          inline: false
        }
      )
      .setFooter({ text: `Anuncio de ${message.guild.name}` });

    message.delete()

    message.channel.send({ embeds: [embed] })

  }

}