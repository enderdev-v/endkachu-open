const Discord = require(`discord.js`);

module.exports = {
  name: "unban",
  alias: [],
	description: `desbanea al usuario \n usa !unban {id}`,
  userPerms: [`BanMembers`],
  botPerms: [`BanMembers`],

  async run(client, message, args){

    const userId = args.join(` `)
    if(!userId) return message.reply('cual usuario va a ser desbaneado')

    message.guild.bans.fetch().then(bans => {
      if(bans.size === 0) return message.reply("no hay nadie baneado")

    const bUser = bans.find(b => b.user.id == userId)
      if(!bUser) return message.reply('no encontré al usuario sorry')
      message.guild.members.unban(bUser.user)
    })
    message.channel.send("el usuario fue desbaneado correctamente")
  }
  
}