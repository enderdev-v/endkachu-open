const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "random",
  alias: [],
	description: `muestra numeros randoms para hacer lo que quieras`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){
  var Numero = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`]
  var Aleatorio = Math.floor(Math.random()*(Numero.length));

  let embed = new EmbedBuilder()
  .setTitle('El numero aleatorio del 1 al 10 es ')
  .setColor(`BLUE`)
  .setDescription(Numero[Aleatorio]);
    
  message.channel.send({ embeds: [embed] });   
  }
  
}