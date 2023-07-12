const Discord = require(`discord.js`);

module.exports = {
  name: "kick",
  alias:  [],
	description: `expulsa a los usuarios de este servidor \n usa !kick {usuario} {razon}`,
  userPerms: [`KickMembers`],
  botPerms: [`KickMembers`],

  async run(client, message, args){

    
    const user = message.mentions.members.first(),
   kickReason = args.join(` `).slice(22);

    if(!user) return message.reply("Debes mencionar a alguien!")
    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puede kickear a alguien igual o mayor rango que tu")
    if(user === message.author) return message.reply("no te puedes au kickear") 
    if(!kickReason) return message.reply("por que lo quiere kickear especificate")
    user.kick({ reason: kickReason })
    message.channel.send(`El usuario **${user}** fu kickeado por **${kickReason}** \n kickeado por enderBot`)

  }
  
}