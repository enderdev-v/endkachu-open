import { EmbedBuilder, Message } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import AfkSchema from "../../Schemas/AfkSchema";

const afk: DiscordEvent = {
    name: "messageCreate",
    run: async (client, msg: Message) => {
        const data = await AfkSchema.findOne({ user: msg.author.id });

        if (!data) {
            const user = msg.mentions.members.first();
            if(!user) return;
           await AfkSchema.findOne({ user: user.user.id }).then(datab => {
               if (datab) {
                   msg.delete();
                   return msg.channel.send("No puedes enivarle un mensaje a este usuario").then(m => {
                       setTimeout(() => {
                           m.delete();
                       }, 6000);
                   });
               }
            });
            return;
        }
        const embed = new EmbedBuilder()
            .setTitle(`Usuario ${msg.author.displayName} ya no esta afk`)
            .setThumbnail(msg.author.avatarURL({ extension: "png", forceStatic: true, size: 256 }))
            .setDescription(`El usuario ${msg.author.displayName}  estuvo afk <t:${Math.round(data.date / 1000)}:R>`)
            .setColor(0x3f7ede);

        await msg.channel.send({ embeds: [embed] }).then(m => {
            setTimeout(() => {
                m.delete();
            }, 6000);
        });
        await AfkSchema.findOneAndDelete({ user: msg.author.id });
        
    }
};

export default afk;