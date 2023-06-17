const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name: "userinfo",
  alias: [],
  description: `muestra informacion sobre el usuario \n usa !userinfo [usuario]`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {

    let usuario = message.mentions.members.first() || message.member;
    let roles = usuario.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(roles => roles.toString())
      .slice(0, -1);


    let banner = usuario.banner ? usuario.bannerURL() : usuario.hexAccentColor;
    let name = usuario.user.discriminator = "0" ? usuario.user.username : usuario.user.tag;

		//console.log(usuario.user.discriminator, "discriminador")

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
					value: `${name}`,
          inline: false
        },
        {
          name: "Apodo",
          value: `${usuario.nickname || "no tiene ningun apodo"}`,
          inline: false
        },
        {
          name: "Id:",
          value: `${usuario.user.id}`,
          inline: false
        },
        {
          name: "Creacion de la cuenta:",
          value: `${usuario.user.createdAt.toLocaleDateString()}`,
          inline: false
        },
        {
          name: "Ingreso al servidor:",
          value: `${usuario.joinedAt.toLocaleDateString()}`,
          inline: false
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