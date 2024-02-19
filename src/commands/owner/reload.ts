import { cmd } from "../../types/endkachu";

const reload: cmd = {
    name: "reload",
    alias: ["rl"],
    description: "Recargar cosas",
    usage: "reload <command name>",
    userPerms: [],
    botPerms: [],
    isOwner: true,
    run: async (client, message, args) => {
        const options = {
            commands: client.loadCommands(),
            slashcommands: client.loadSlashCmds(),
            events: client.loadEvents()
        };
        const option = args[0];
        if (!option || options[option] == undefined) return message.channel.send("debes escoger una opcion : commands, slashcommands, events");
      message.channel.send({ embeds: [{ title: `Recargando ${option}`, description: `<a:cargando:988282702052614215> Recargando`, color: client.color }] }).then(async m => {
        m.edit({ embeds: [{ title: `Reload command`, description: `<a:wow:1044253839869624351> ${option}, Cargados`, color: client.color }] });
      });
      options[option];
    },
};
export default reload; 