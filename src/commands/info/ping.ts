import { cmd } from "../../types/endkachu";

const ping: cmd = {
  name: "ping",
  alias: [],
  description: `Muestra la latencia del bot`,
  usage: "!ping",
  userPerms: [],
  botPerms: [],
  isOwner: false,
  run: async(client, message) => {

    message.reply({ embeds: [{ title: "Ping", description: `<:interesante:963559201584607373> API Pong! ${client.ws.ping}ms \n <:interesante:963559201584607373> Message Pong! ${Date.now() - message.createdTimestamp}ms`, color: client.color }] });

  }

};

export default ping;