const Discord = require(`discord.js`);

module.exports = {
  name: "game",
  alias: [],
	description: `un juego de adivinar el numero que estoy pensando`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {
  var Numero = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`]
  var Aleatoriedad = Math.floor(Math.random()*(Numero.length));

    //<>
   
    const cantidad = args[0]
    if(cantidad > 10) return message.reply("esa cantidad no esta del 1 al 10")
    if(cantidad <= 0)  return message.reply("esa cantidad no esta del 1 al 10")
    if (!cantidad) return message.reply("escribe una cantidad")
    if (isNaN(cantidad)) return message.reply("escribe una cantidad  en numeros")

    let embed = new Discord.EmbedBuilder()
    .setTitle("Juego de adivinar numeros")
    .addFields(
      {
        name: `Tu numero`,
        value: `${cantidad}`,
        inline: false
      },
      {
        name: `Mi Numero`,
        value: `${Numero[Aleatoriedad]}`,
        inline: false
      }
    )
      .setColor(0x3f7ede);

    message.channel.send({ embeds: [embed] })
    

  }

}