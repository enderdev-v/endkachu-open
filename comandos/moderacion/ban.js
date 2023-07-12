const Discord = require(`discord.js`);

module.exports = {
  name: "ban",
  alias: [],
	description: `banea a los usuarios de este servidor `,
  userPerms: [`BanMembers`],
  botPerms: [`BanMembers`],
 async run(client, message, args){

    const user = message.mentions.members.first(),
      banReason = args.join(` `).slice(22);

    if(!user) return message.reply("Debes mencionar a alguien!")

    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puedes banear a alguien igual o mayor rango que tu")

    if(user === message.author) return  message.reply("no te puedes banear a ti mismo") 

    if(!banReason) return message.reply("cual es la razon del baneo al usuario")

    user.ban({ reason: banReason })
   
    message.channel.send({ embeds: [{ title: `Usuario Baneado`,  description: `El usuario **${user.user.tag}** fue baneado por **${banReason}**`, color: 0x3f7ede }] })

  }
  
}