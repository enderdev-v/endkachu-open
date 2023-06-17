const { SlashCommandBuilder } = require(`discord.js`)
const Discord = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription(`Muestra la latencia del bot`),
	
  async run(client, int){
  
		await int.deferReply();
	
		setTimeout(async () => {
     await int.editReply({ embeds: [{ title: "Ping", description: `\<:interesante:963559201584607373> Pong! ${client.ws.ping}ms`, color: 0x3f7ede }]})
   }, 1000)
    
  }
}