import { cmd } from "../../types/endkachu";

const jumbo: cmd = {
    name: "jumbo",
    alias: [],
    description: "Muestra el emoji en grande",
    usage: "userinfo <emoji>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const emoji = args[0];
        if(!emoji) return message.reply({ content: 'manda un emoji', allowedMentions: { repliedUser: false }}); 

        const emote = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1]);
        if(!emote) return message.reply({ content: 'no se encontró el emoji', allowedMentions: { repliedUser: false }});

        message.channel.send(emote.url);
    }
};
export default jumbo;