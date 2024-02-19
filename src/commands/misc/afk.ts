import { EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";
import AfkSchema from "../../Schemas/AfkSchema";

const afk: cmd = {
    name: "afk",
    alias: [],
    description: "Pon que estas fuera del teclado y lo dira el bot",
    usage: "afk [message]",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const reason = args.length !== 0 ? args.join(" ") : "No se a especificado una razon";
        await AfkSchema.findOneAndUpdate(
			{ user: message.author.id },
			{ user: message.author.id, date: Date.now() },
			{ new: true, upsert: true }
		);
        const embed = new EmbedBuilder()
            .setTitle(`Usuario ${message.author.displayName} AFK`)
            .setThumbnail(message.author.avatarURL({ extension: "png", forceStatic: true, size: 256 }))
            .setDescription(`El usuario ${message.author.username} esta afk \nrazon: ${reason}`)
            .setColor(client.color);

        message.channel.send({ embeds: [embed] });  
        
    }
};
export default afk;