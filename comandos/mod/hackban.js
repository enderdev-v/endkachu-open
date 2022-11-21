const Discord = require(`discord.js`);

module.exports = {
  name: "hackban",
  alias: [],
	description: `banea usuarios del servidor o externos con la id del usuario \n usa !hackban {id} {razon}`,
  userPerms: [`BanMembers`],
  botPerms: [`BanMembers`],

 async run(client, message, args){

   
		let id = args[0]
		if(!id) return message.reply({ content: `debes escribir una id del usuario`,  allowedMentions: { repliedUser: false } })

		let razon = args.slice(1).join(" ")
	 if(!razon) return message.reply({ content: `debes escribir una razon de su ban`,  allowedMentions: { repliedUser: false } })

		let user = await client.users.fetch(id)
		message.guild.members.ban(user.id)

		message.channel.send(`el usuario ${user} fue baneado por ${razon}`)



  }
  
}