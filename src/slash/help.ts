import { slashcmd } from "../types/endkachu";
import { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction } from "discord.js";
import { readdirSync } from "node:fs";
import { opts } from "../structures/help";
import path from "node:path";

const help: slashcmd = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Muestra una lista de mis comandos`)
        .addStringOption(opt => opt.setName("command").setDescription("Muestra")),
    run: async (client, int) => {
        const command = int.options.getString("command");
        const embed = new EmbedBuilder()
            .setTitle('Lista de comandos')
            .setColor(0x3f7ede)
            .setThumbnail(client.user.avatarURL({ forceStatic: true }))
            .setDescription('Aqui esta una lista de categorias de mis comandos')
            .addFields({ name: '≫ Categorias', value: '<:interesante:1044261055280463882> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas', inline: false });
        const menu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(new StringSelectMenuBuilder()
                .setPlaceholder(`Menu de ayuda ✔`)
                .setCustomId(`menu`)
                .setPlaceholder(`Seleccionna una de mis categorias`)
                .addOptions(opts)
            );

        if (command) {
            const cmd = client.commands.get(command);
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
                color: 0x3f7ede,
                footer: { text: ` [ ] opcional, < > requerido` }
            };
            if (!cmd) return await int.reply('no se encontro el comando');
            return await int.reply({ embeds: [helpcmd] });
        }


        const m = await await int.reply({ embeds: [embed], components: [menu] });

        const collector = m.createMessageComponentCollector({ filter: (i) => i.user.id === int.member.user.id, time: 60000 });

        collector.on('collect', async (i: StringSelectMenuInteraction) => {
            const select = i.values[0];

            const slash = readdirSync(path.join("./src/slash", select));
            function msg() {
                const subcmds = [];
                slash.forEach(command => {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const commands = require(`../slash/${select}/${command}`);
                    subcmds.push(`* </${commands.default.subcommand.split(".").join(" ")}:901239070716473345>`);

                });
                return subcmds.join("\n");
            }

            const emoji = menu.components[0].options.find(opt => opt.data.value === select);
            const subcmds = msg();
            const embed2 = new EmbedBuilder()
                .setTitle(`<:${emoji.data.emoji.name}:${emoji.data.emoji.id}> ${select}`)
                .setDescription(`Aqui te muestro una lista de todos los comandos que tengo de \n**${select}**`)
                .addFields({
                    name: '≫ Comandos',
                    value: subcmds,
                    inline: false
                })
                .setColor(0x3f7ede)
                .setThumbnail(client.user.avatarURL({ forceStatic: true }));
            m.edit({ embeds: [embed2] });

            i.deferUpdate();

        });
    }
};
export default help;