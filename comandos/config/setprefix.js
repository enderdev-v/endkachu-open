const Discord = require(`discord.js`);
const prefixSchema = require(`../../Schemas/prefixSchema`)

module.exports = {
  name: "setprefix",
  alias: [],
  	description: `Comando para cambiar el prefix`,
  userPerms: [`ManageGuild`],
  botPerms: [`ManageGuild`],

  async run(client, message, args){


        let prefix = args.join(" ")

    if (!prefix) return message.reply(`No Pusiste el prefix`)

    let data = await prefixSchema.findOne({ guildId: message.guild.id }) 

    if(!data) {
		let newdata = new prefixSchema({
			prefix: prefix,
			guildId: message.guild.id
		})
    return await newdata.save()
	}
	await prefixSchema.findOneAndUpdate({
		  prefix: prefix,
			guildId: message.guild.id
	})
	
	
      message.reply(`Prefix Cambiado a ${prefix}`)
 
    
  }

    }