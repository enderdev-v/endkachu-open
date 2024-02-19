import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { cmd } from "../../types/endkachu";
import { readdirSync } from "node:fs";
import { opts } from "../../structures/help";

const help: cmd = {
    name: "help",
    alias: [],
    description: "Despliega la lista completa de mis comandos",
    usage: "help [comando]",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle('Lista de comandos')
            .setColor(client.color)
            .setThumbnail(client.user.avatarURL({ forceStatic: true }))
            .setDescription('Aqui esta una lista de categorias de mis comandos')
            .addFields({ name: '≫ Categorias', value: '<:interesante:1044261055280463882> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas \n <:queno:1044253989803397120> Admin', inline: false });
        const menu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(new StringSelectMenuBuilder()
                .setPlaceholder(`Menu de ayuda ✔`)
                .setCustomId(`menu`)
                .setPlaceholder(`Seleccionna una de mis categorias`)
                .addOptions(opts)
            );

        if (args[0]) {
            const cmd = client.commands.get(args[0]);
            const helpcmd = {
                title: `Ayuda del comando **${cmd.name}**`,
                description: `**Descripción del comando** \n ${cmd.description}`,
                fields: [
                    {
                        name: `alias`,
                        value: `${cmd.alias}`
                    },
                    {
                        name: `Permisos del bot`,
                        value: `${cmd.botPerms ? cmd.userPerms.join(" ,") : "no hay permisos necesarios para el mi"}`
                    },
                    {
                        name: `Permisos del usuario`,
                        value: `${cmd.userPerms ? cmd.userPerms.join(", ") : "No hay permisos para el usuario"}`
                    },
                    {
                        name: `Uso`,
                        value: `${cmd.usage}`
                    }
                ],
                color: client.color,
                footer: { text: ` [ ] opcional, < > requerido` }
            };
            if (!cmd) return message.channel.send('no se encontro el comando');
            return message.channel.send({ embeds: [helpcmd] });
        }


        const m = await message.reply({ embeds: [embed], components: [menu] });

        const collector = m.createMessageComponentCollector({ filter: (i) => i.user.id === message.author.id, time: 60000 });

        collector.on('collect', async (int: StringSelectMenuInteraction) => {
            const select = int.values[0];

            if (select === `home`) m.edit({ embeds: [embed] });

            const cmd = readdirSync(`./src/commands/${select}`);
            function msg() {
                const cmds = [];
                cmd.forEach(command => {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const commands = require(`../../commands/${select}/${command}`);
                    cmds.push(`* ${commands.default.name}`);
                });
                return cmds;
            }
            const emoji = menu.components[0].options.find(opt => opt.data.value === select);
            const cmds = msg();
            const list = cmds.join('\n');
            const embed2 = new EmbedBuilder()
                .setTitle(`<:${emoji.data.emoji.name}:${emoji.data.emoji.id}> ${select}`)
                .setDescription(`Aqui te muestro una lista de todos los comandos que tengo de \n**${select}**`)
                .addFields({
                    name: '≫ Comandos',
                    value: list,
                    inline: false
                })
                .setColor(client.color)
                .setThumbnail(client.user.avatarURL({ forceStatic: true }));
            m.edit({ embeds: [embed2] });

            int.deferUpdate();
        });
    }
};
export default help;