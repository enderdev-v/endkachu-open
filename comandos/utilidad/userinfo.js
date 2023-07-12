const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "userinfo",
  alias: [],
  description: `muestra informacion sobre el usuario \n usa !userinfo [usuario]`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {

    const usuario = message.mentions.members.first() || message.member,
    roles = usuario.roles.cache.sort((a, b) => b.position - a.position).map(roles => roles.toString()).slice(0, -1),
    banner = usuario.banner ? usuario.bannerURL() : usuario.hexAccentColor;
    
    let displayRoles;

    displayRoles = roles.join(", ")

    if (roles.length < 1) {
      displayRoles = `no tiene roles`
    }
    let embed = new EmbedBuilder()
      .setTitle(`informacion de ${usuario.user.username}`)
      .setThumbnail(usuario.user.displayAvatarURL({ format: `png` }))
      .setColor(0x3f7ede)
      .setImage(banner)
      .addFields(
        {
          name: `Tag`,
					value: `${usuario.user.name}`,
          inline: true
        },
        {
          name: "Apodo",
          value: `${usuario.nickname || "no tiene ningun apodo"}`,
          inline: true
        },
        {
          name: "Id:",
          value: `${usuario.user.id}`,
          inline: false
        },
        {
          name: "Creacion de la cuenta:",
          value: `${usuario.user.createdAt.toLocaleDateString()}`,
          inline: true
        },
        {
          name: "Ingreso al servidor:",
          value: `${usuario.joinedAt.toLocaleDateString()}`,
          inline: true
        },
        {
          name: `Roles (${roles.length})`,
          value: displayRoles,
          inline: false
        }
      );

    message.channel.send({ embeds: [embed] })

  }

}