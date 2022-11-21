const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "queue",
  alias: [],
	description: `muestra la lista de canciones`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

		const queue = client.distube.getQueue(message)

    if(!queue) return message.reply(`no hay una cancion en espera`)

       if(!message.member.voice.channel) return message.reply({ content: `Debes estar en un canal de voz`})
    if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ content: `Debes estar en el mismo canal de voz que yo`})

		let embed = new EmbedBuilder()
		.setTitle(`Lista de canciones`)
		.setColor(0x00ae9f)
		.setDescription(queue.songs.map((song, id) => `**${id + 1}**.${song.name} |\`${song.formattedDuration}\``).slice(0, 10).join("\n"))

		message.channel.send({ embeds: [embed] })


  }
  
}