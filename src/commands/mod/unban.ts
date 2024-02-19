import { cmd } from "../../types/endkachu";

const ban: cmd = {
  name: "unban",
  alias: [],
  description: "Banea a un usuario especifico",
  usage: "ban <userid>",
  userPerms: ["BanMembers"],
  botPerms: ["BanMembers"],
  isOwner: false,
  run: async (client, message, args) => {
    const user = args.join(` `);
    if (!user) return message.reply('cual usuario va a ser desbaneado');

    message.guild.bans.fetch().then(bans => {
      if (bans.size === 0) return message.reply("no hay nadie baneado");

      const bUser = bans.find(b => b.user.id == user);
      if (!bUser) return message.reply('no encontré al usuario sorry');
      message.guild.members.unban(bUser.user);
    });
    message.channel.send("el usuario fue desbaneado correctamente");
  }
};

export default ban;