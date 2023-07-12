const { EmbedBuilder } = require(`discord.js`);
const warnSchema = require(`../../Schemas/warnSchema`)


module.exports = {
  name: "warn",
  alias: [],
	description: `le da una advertencia al usuario \n usa !warn {usuario} {razon}`,
  userPerms: [`Administrator`],
  botPerms: [`Administrator`],

  async run(client, message, args){

		await warnSchema.findOneAndUpdate(
			{ guild: message.guild.id, user: message.author.id },
			{ guild: message.guild.id, user: message.author.id },
			{ new: true, upsert: true }
		);
		
    let user = message.mentions.members.first();
    if (!user) return message.reply(`¿cual es el usuario?`)

    if(message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return message.reply("no puedes dar un warn a alguien igual o mayor rango que tu")

   if(user === message.author) return  message.reply("no te puedes dar un warn a ti mismo") 
		
	let razon = args.join(` `).slice(22)

  if (!razon) return message.reply(`¿cual es la razon?`)
  let embed = new EmbedBuilder()
		.setDescription(`**Warn a ${user}** \n\ ${razon}`)
		.setColor(0x297020)

  let objeto = {
      autor: message.author.id,
      fecha: Date.now(),
      razon
    }
    await warnSchema.findOneAndUpdate(
			{ guild: message.guild.id, user: message.author.id },
			{
				$push: {
					notes: objeto
				}
			},
			{ new: true, upsert: true }
		);

		message.channel.send({ embeds: [embed] })


  }
  
}