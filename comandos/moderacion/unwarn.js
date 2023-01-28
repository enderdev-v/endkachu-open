const Discord = require(`discord.js`);
const warnSchema = require(`../../Schemas/warnSchema`)
const { asegurado } = require(`../../utility/funciones`)

module.exports = {
  name: "unwarn",
  alias: [],
  description: `le da una advertencia al usuario \n usa !warn {usuario} {razon}`,
  userPerms: [`ManageGuild`],
  botPerms: [`ManageGuild`],

  async run(client, message, args) {

    let user = message.mentions.members.first();
    if (!user) return message.reply(`¿cual es el usuario?`)

    let data = await warnSchema.findOne({ guildId: message.guild.id, userId: user.id })
if (data.warns.length === 0) return message.reply("el usuario no tiene warns")
    let idwarn = args[1]

    if (idwarn < 0) return message.channel.send(`el numero de warn es invalido`)
  if(isNaN(idwarn)) return message.reply("escribe una cantidad  en numeros")


      if (data.warns !== 'undefined' || data.warns !== null) {
        message.channel.send(`Se ha quitado el warn correctamente `)
      data.warns.splice(idwarn, 1)
      data.save()
      }
  }
}