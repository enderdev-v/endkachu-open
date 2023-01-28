const { EmbedBuilder, PermissionsBitField, ChannelType } = require(`discord.js`)
const prefixSchema = require(`../../Schemas/prefixSchema`)
const config = require("../../utility/config.json")

module.exports = {
	name: `messageCreate`,
	async run(client, message){

    let data = await prefixSchema.findOne({ guildId: message.guild.id})
		
  if(message.channel.type === ChannelType.Dm) return;
 if(message.author.bot) return;

  let prefix;
     if (!data || !data.prefix) { 
     prefix = config.prefix 
   } else { 
    prefix = data.prefix;
   } 
    
  if(!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  ///////Handler///////

  let cmd = client.commands.find((c) => c.name === command ||  c.alias &&  c.alias.includes(command));

	if(cmd){
		if(!message.member.permissions.has(PermissionsBitField.resolve(cmd.userPerms || []))) return message.reply(`no tienes el permiso ${cmd.userPerms || []}`)
		if(!message.guild.members.me.permissions.has(PermissionsBitField.resolve(cmd.botPerms || []))) return message.reply(`no tengo el permiso ${cmd.botPerms || []}`)
	}
    
	
		if(cmd){
    cmd.run(client, message, args)
  }

	}
}