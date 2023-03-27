const Discord = require(`discord.js`);

module.exports = {
  name: "ping",
  alias: [],
	description: `muestra la latencia del bot`,
  userPerms: [],
  botPerms: [],
  async run(client, message, args){
    
    message.reply({ embeds: [{ title: "Ping", description: `\<:interesante:963559201584607373> Pong! ${client.ws.ping}ms`, color: 0xFFFFF }]})

  }
  
}