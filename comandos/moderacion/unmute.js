const Discord = require(`discord.js`);
module.exports = {
  name: "untimeout",
  alias: [],
	description: `quita el aislamiento del usuario \n usa !unmute {usuario} `,
  userPerms: [`ModerateMembers`],
  botPerms: [`ModerateMembers`],

  async run(client, message, args){
    let user = message.mentions.members.first();
    if(!message.guild.me.permissions.has("MODERATE_MEMBERS")) return message.reply("No tengo los permisos!")
   if(!user) return message.reply("no puedo mutear a nadie mencionalo")
   if(!user.isCommunicationDisabled()) return message.reply("el usuario ya esta muteado")
   if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.reply("no tienes permisos para usar este comando")
    user.timeout(null)

    message.channel.send(`el usuario ${user} fue desmuteado`)


  }
  
}