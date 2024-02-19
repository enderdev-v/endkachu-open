import { cmd } from "../../types/endkachu";

const hackban: cmd = {
    name: "hackban",
    alias: [],
    description: "Banea a un usuario con su id",
    usage: "hackban <id>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        if (!args[0]) return message.reply({ content: `debes escribir una id del usuario`, allowedMentions: { repliedUser: false } });

        const razon = args.slice(1).join(" ");
        const user = await client.users.fetch(args[0]);
        if (!razon) return message.reply({ content: `debes escribir una razon de su ban`, allowedMentions: { repliedUser: false } });

        message.guild.members.ban(user.id);

        message.channel.send(`el usuario ${user} fue baneado por ${razon}`);

    }
};
export default hackban;