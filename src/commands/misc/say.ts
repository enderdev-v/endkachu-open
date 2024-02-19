import { TextChannel } from "discord.js";
import saySchema from "../../Schemas/saySchema";
import { cmd } from "../../types/endkachu";

const say: cmd = {
    name: "say",
    alias: [],
    description: "Decir algo con el bot",
    usage: "say <message>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {

        const data = await saySchema.findOne({ guild: message.guild.id });
        let texto = args.join(' ');

        if (!texto) return message.channel.send('no puedo mandar algo que esta vacio');

        if (texto.includes('@everyone') || texto.includes('@here')) {
            texto = texto.replace('@here', 'here');
            texto = texto.replace('@everyone', 'everyone');
        }
        if (data?.antilinks || data?.antilinks === true) {
            if (texto.includes('https') || texto.includes('discord')) {
                const txt = texto.split(' ');
                const found = txt.find(element => element.includes('https') || element.includes('http') || element.includes('discord'));
                const index = txt.indexOf(found);
                txt[index] = 'link';
                texto = txt.join(' ');
            }
        }

        if (data?.logs) {
            if (!data?.logs || !message.guild.channels.cache.get(data?.logs)) return;
            const canal = message.guild.channels.cache.get(data.logs) as TextChannel;
            canal.send({ embeds: [{ title: `Comando Say usado por ${message.author.tag}`, description: `**el texto fue:** \n ${texto}`, color: 0xfffff }] });
        }

        if (data?.watermark === `reply`) return message.reply({ content: texto });
        
        message.delete();
        if (data?.watermark === `footer`) return message.channel.send(`${texto} \n \n de ${message.author.tag}`);
        else return message.channel.send(texto);
        

    }
};

export default say;