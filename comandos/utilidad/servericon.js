const { EmbedBuilder } = require(`discord.js`);
module.exports = {
  name: "servericon",
  alias: [],
	description: `muestra icono  del servidor`,
  userPerms: [],
  botPerms: [],

 async run(client, message, args){

    let embedavatar = new  EmbedBuilder()

    .setTitle(`Icono del servidor **${message.guild.name}**`)
    .setImage(message.guild.iconURL({ size: 1024, dynamic: true, format: `png` }))
    .setFooter({ text: `icono pedido por: ${message.author.username}` });

    message.channel.send({ embeds: [embedavatar] });

  }
  
}