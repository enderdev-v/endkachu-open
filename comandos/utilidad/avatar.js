const { EmbedBuilder } = require(`discord.js`);
module.exports = {
  name: "avatar",
  alias: [],
	description: `mestra el avatar del usuario \n usa !avatar [usuario]`,
  userPerms: [],
  botPerms: [],

 async run(client, message, args){

    let usuario = message.mentions.members.first() || message.member;

    let embedavatar = new EmbedBuilder()
    .setTitle(`Avatar de **${usuario.user.username}**`)
    .setImage(usuario.user.displayAvatarURL({ size: 1024, forceStatic: true, extension: `png` }))
    .setFooter({ text: `avatar pedido por: ${message.author.username}` });

    message.channel.send({ embeds: [embedavatar] });

  }
  
}