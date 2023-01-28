const { EmbedBuilder } = require(`discord.js`);
const embedSchema = require("../../Schemas/embedSchema")
module.exports = {
  name: "sayembed",
  alias: [],
  description: `muestra informacion del usuario en embed usa !sayembed {titulo} {info} `,
  userPerms: [`Administrator`],
  botPerms: [`Administrator`],

  async run(client, message, args) {

    let data = await embedSchema.findOne({ guild: message.guild.id })

    let texto = args.slice(2).join(" ")

    let color = (!data?.color) ? 0x050cd9 :  parseInt(data?.color)
    let footer = (!data?.footer) ? `Anunció de ${message.guild.name}` : data.footer 

    if (!texto) return message.channel.send("que escribo en el anuncio")

    let title = args[0]

    if (!title) return message.channel.send("que escribo en el anuncio")



    let embed = new EmbedBuilder()
      .setTitle(title)
      .setThumbnail(message.guild.iconURL())
      .setColor(color)
      .addFields(
        {
          name: "Anuncio:",
          value: texto,
          inline: false
        }
      )
      .setFooter({ text: footer })
  
     if (!data?.msg) return message.channel.send({ embeds: [embed] })
     else return message.channel.send({ content: data.msg, embeds: [embed]})
  }

}