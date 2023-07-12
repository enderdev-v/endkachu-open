const Discord = require(`discord.js`);

module.exports = {
  name: "hackban",
  alias: [],
	description: `banea usuarios del servidor o externos con la id del usuario \n usa !hackban {id} {razon}`,
  userPerms: [`BanMembers`],
  botPerms: [`BanMembers`],

 async run(client, message, args){

   
	if(!args[0]) return message.reply({ content: `debes escribir una id del usuario`,  allowedMentions: { repliedUser: false } })

		const razon = args.slice(1).join(" "),
	  user = await client.users.fetch(args[0])
	 if(!razon) return message.reply({ content: `debes escribir una razon de su ban`,  allowedMentions: { repliedUser: false } })

		message.guild.members.ban(user.id)

		message.channel.send(`el usuario ${user} fue baneado por ${razon}`)



  }
  
}