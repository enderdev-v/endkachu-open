import {  EmbedBuilder, GuildMember } from "discord.js";
import { cmd } from "../../types/endkachu";
import { userGet } from "../../structures/functions";

const userinfo: cmd = {
    name: "userinfo",
    alias: [],
    description: "Información sobre un usario",
    usage: "userinfo [user]",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const embed = (user: GuildMember, badges: string[]) => {
            const roles = user.roles.cache.sort((a, b) => b.position - a.position).map(roles => roles.toString()).slice(0, -1);
            console.log(badges);
            const displayRoles = roles.length < 1 ? `no tiene roles` : roles.join(", ");
            const usercolor = user.displayHexColor.replace("#", "0x");
            return new EmbedBuilder()
                .setTitle(`informacion de ${user.user.username}`)
                .setThumbnail(user.user.displayAvatarURL({ extension: `png` }))
                .setColor(Number(usercolor))
                .addFields(
                    {
                        name: `Tag`, value: `${user.user.username}`, inline: true
                    },
                    {
                        name: "Apodo", value: `${user.nickname || "no tiene ningun apodo"}`, inline: true
                    },
                    {
                        name: "Id:", value: `${user.user.id}`, inline: false
                    },
                    {
                        name: "Creacion de la cuenta:", value: `${user.user.createdAt.toLocaleDateString()}`, inline: true
                    },
                    {
                        name: "Ingreso al servidor:", value: `${user.joinedAt.toLocaleDateString()}`, inline: true
                    },
                    {
                        name: `Roles (${roles.length})`, value: displayRoles, inline: false
                    }
                );
        };
        try {
            const user = await userGet(message, args) || message.member;
            const badges = (await user.user.fetchFlags()).toArray();

            message.channel.send({ embeds: [embed(user, badges)] });

        } catch (e) {
            const badges = (await message.member.user.fetchFlags()).toArray();
            if (e.code === 10013) {
                message.channel.send({ embeds: [embed(message.member, badges)] });
                console.log(message.member.user.partial);
            } else {
                message.channel.send("Ocurrio un error");
            }
        }
    }
};
export default userinfo;