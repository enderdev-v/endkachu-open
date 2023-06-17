const Discord = require(`discord.js`);

module.exports = {
  name: "8ball",
  alias: [],
	description: `un juego de azar para divertir donde hay 8 diferentes palabras`,
  usage: `!8ball {pregunta}`,
  userPerms: [],
  botPerms: [],

  async  run(client, message, args){

    const question = args.join(" ")
    if (!question) return message.reply("preguntame algo")

  var Ball = [
       `si`, 
       `no`,
       `quiziera comprobarlo`,
        `por supuesto`, 
      `claro que no`, 
     `muy cierto`,
     `que dijiste`, 
    `claro que si`
]
  let Aleatorio = Math.floor(Math.random()*(Ball.length));

    const embed = new Discord.EmbedBuilder()
    .setTitle("8Ball Question")
    .setDescription("Pregunta: \n " + question )
    .addFields(
      {
    name: `Respuesta:`,
        value: `${Ball[Aleatorio]}`,
     inline: false
      }
    ) 
		.setColor(0x3f7ede)
 message.channel.send({ embeds: [embed] })
  }
  
}