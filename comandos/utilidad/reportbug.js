const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "reportbug",
  alias: [],
	description: `reporta un bug sobre el bot usa !reportbug {bug} `,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

  let bug = args.join(" ")

  if(!bug) return message.channel.send("Escribe el Bug que deceas reportar")  

  let embed = new EmbedBuilder()
    .setTitle('Reporte de bug')
  .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`el reporte de este bug fue hecho por ${message.author.username}`)
    .addFields(
      {
        name: `el bug es:`, 
        value: `${bug}`
      }
        )
    .setColor(0x3f7ede);

  message.delete()

		let ender = `780277567537414165`

  message.channel.send(`tu reporte fue enviado`)

  client.channels.cache.get(`927640803730411550`).send({ content: ` Hola <@${ender}>`, embeds: [embed] })

  }
  
}