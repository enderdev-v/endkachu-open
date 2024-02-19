import { AttachmentBuilder, EmbedBuilder, GuildMember, TextChannel } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import boostSchema from "../../Schemas/boostSchema";

const boost: DiscordEvent = {
    name: "guildMemberUpdate",
    run: async (client, member: GuildMember, newmember: GuildMember) => {
        const oldStat = member.premiumSince;
        const newStat = newmember.premiumSince;
        if (!oldStat && newStat) {
            const data = await boostSchema.findOne({ guild: member.guild.id });
            if (!data) return;

            // Imagenes
            const avatar = member.user.displayAvatarURL({
                extension: 'png',
                forceStatic: true,
                size: 256
            });


            const back = `https://media.discordapp.net/attachments/988614407930146906/1117566632223580160/IMG_20230611_153016.png`;
            // Canvas
            
            const attachment = new AttachmentBuilder(back, {
                name: 'bye.png'
            });
            if (data.channel) {
                const canal = member.guild.channels.cache.get(data.channel);
                const embed = new EmbedBuilder()
                    .setTitle(
                        '<:wow:963550260863590492> Adios <:wow:963550260863590492>'
                    )
                    .setThumbnail(avatar)
                    .setDescription(
                        `Se fue ${member.user.username
                        } \n Que le vaya bien`
                    )
                    .setImage('attachment://bye.png')
                    .setColor(0x008a59);
                if (canal instanceof TextChannel) {
                    canal.send({ embeds: [embed], files: [attachment] });
                }
            }
        }
    }
};

export default boost;