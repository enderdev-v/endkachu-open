const Discord = require(`discord.js`);
const ms = require("ms")

module.exports = {
  name: "timeout",
  alias: [],
	description: `aisla a los usuarios malos \n usa !mute {usuario} {tiempo} {razon}`,
  userPerms: [`ModerateMembers`],
  botPerms: [`ModerateMembers`],

  async run(client, message, args){

   
    const user = message.mentions.members.first(),
		 tiempo = args[1],
		 time = ms(tiempo),
     muteReason = args[2];
   if(!user) return message.reply("no puedo mutear a nadie mencionalo")

   if(user.isCommunicationDisabled()) return message.reply("el usuario ya esta aislado") 	
    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puede mutear a alguien igual o mayor rango que tu")
    if(user === message.author) return message.reply("no te puedes auto aislar")     
    if(!tiempo) return message.reply("por cuanto tiempo dimelo")    
    if(!muteReason) return("debes decir por que lo voy a mutear")

		try{	
      await user.timeout(time, muteReason)
		} catch(e){
			console.error(e)
		}

    message.channel.send(`el usuario ${user} fue muteado por ${tiempo} con la razon de ${muteReason}`)


  }
  
}