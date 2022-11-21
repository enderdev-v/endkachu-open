const { EmbedBuilder } = require(`discord.js`);
module.exports = {
  name: "randomuser",
  alias: [],
	description: `muestra un usuario random del usuario`,
  userPerms: [],
  botPerms: [],

 async run(client, message, args){

    let usuario = message.guild.members.cache.random()

   let roles = usuario.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(roles => roles.toString())
      .slice(0, -1)

    let displayRoles;

    displayRoles = roles.join(", ")

    if (roles.length < 1) {
      displayRoles = `no tiene roles`
    } 
   
    let embed = new EmbedBuilder()

    .setTitle(`Avatar de **${usuario.user.tag}**`)
    .setThumbnail(usuario.user.displayAvatarURL({ size: 1024, dynamic: true, format: `png` }))
    .setColor(`Random`)
    .setDescription(` Username: ${usuario.displayName} \n ID: ${usuario.id} \n Roles: ${displayRoles}`);


    message.channel.send({ embeds: [embed] });

  }
  
}