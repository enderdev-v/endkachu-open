const Discord = require(`discord.js`);
const ms = require("ms")

module.exports = {
  name: "tempban",
  alias: [],
	description: `banea a los usuarios temporalmente \n usa !tempban {usuario} {tiempo} {razon}`,
  userPerms: [`BanMembers`],
  botPerms: [`BanMembers`],

  async run(client, message, args){

    
    const user = message.mentions.members.first(),
	  time = ms(tiempo),  
    banReason = args.slice(2).join(" ");
     
   if(!user) return message.reply("no puedo Banear a nadie mencionalo")

    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puede kickear a alguien igual o mayor rango que tu")
    if(user === message.author) return message.reply("no te puedes autobanear")   
    if(!tiempo) return message.reply("por cuanto tiempo dimelo")
    if(!banReason) return message.reply("debes decir por que lo voy a Banear")   
   
    await user.ban({ time, banReason })
    message.channel.send(`el usuario ${user} fue baneado por ${tiempo} con la razon de ${banReason}`)


    setTimeout(() => {
      message.guild.members.unban(user)
    }, time)
    

  }
  
}