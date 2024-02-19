import { EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";


const randomuser: cmd = {
  name: "randomuser",
  alias: [],
  description: "Muestra un usuario aleatorio del servidor",
  usage: "randomuser",
  userPerms: [],
  botPerms: [],
  isOwner: false,
  run: async (client, message) => {

    const usuario = message.guild.members.cache.random();
    const roles = usuario.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(roles => roles.toString()).slice(0, -1);

    let displayRoles;

    displayRoles = roles.join(", ");

    if (roles.length < 1) {
      displayRoles = `no tiene roles`;
    }
    const usercolor = usuario.displayHexColor.replace("#", "0x");

    const embed = new EmbedBuilder()
      .setTitle(`Avatar de **${usuario.user.tag}**`)
      .setThumbnail(usuario.user.displayAvatarURL({ size: 1024, extension: `png`, forceStatic: true }))
      .setColor(Number(usercolor))
      .setDescription(` Username: ${usuario.displayName} \n ID: ${usuario.id} \n Roles: ${displayRoles}`);


    message.channel.send({ embeds: [embed] });

  },
};
export default randomuser;