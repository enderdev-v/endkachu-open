import { ChannelType } from "discord.js";
import reviveSchema from "../../Schemas/reviveSchema";
import { cmd } from "../../types/endkachu";

const setrevive: cmd = {
    name: "setrevive",
    alias: [],
    description: "Sets the revive time for a user",
    usage: `setrevive <channel, rol> <options>`,
    userPerms: [`Administrator`],
    botPerms: [`Administrator`],
    isOwner: false,
    run: async (client, message, args) => {
        const role = message.mentions.roles.first();
        const canal = message.mentions.channels.first() ||  message.guild.channels.cache.get(args[0]);
        const option = args[0];

        await reviveSchema.findOneAndUpdate(
            { guild: message.guild.id },
            { guild: message.guild.id },
            { new: true, upsert: true }
        );

        if (!option) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción \n opciones: rol, channel` }] });

        const saveData = async (data) => {
            return await reviveSchema.findOneAndUpdate(
                { guild: message.guild.id },
                data,
                { new: true, upsert: true }
            );
        };

        const object = {
            rol: () => {
                if (!role)
                    return message.reply({ embeds: [{ color: 0xe14e2c, title: 'Hubo un error', description: 'no se encuentra o no mencionaste el rol' }] });
                saveData({ role: role.id });
                return message.channel.send({ embeds: [{ title: `Rol establecido`, description: `<:check:963554878200901692> Rol:  ${role} establecido correctamente`, color: 0x297020 }] });

            },
            channel: () => {
                if (!canal || canal.type === ChannelType.GuildStageVoice || canal.type === ChannelType.GuildVoice) {
                    return message.reply({ embeds: [{ title: 'Canal no valido', description: `Ese canal no es válido o no existe en este servidor`, color: 0xe14e2c }] });
                }
                saveData({ channel: canal.id });
                return message.channel.send({ embeds: [{ title: `Canal establecido`, description: `<:check:963554878200901692> Canal:  ${canal} establecido correctamente`, color: 0x297020 }] });

            }
        };

        const ejecutar = object[option.toLowerCase()];

        ejecutar();
    }
};

export default setrevive;