import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";

const playgame: cmd = {
    name: "game",
    alias: [],
    description: "Juega piedra papel o tijeras ",
    usage: "game",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {

        const options = new ActionRowBuilder<ButtonBuilder>()
            .addComponents([
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel(`Piedra`)
                    .setCustomId("Piedra")
                    .setEmoji(`🪨`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Papel")
                    .setCustomId("Papel")
                    .setEmoji(`📰`),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Tijeras")
                    .setCustomId("Tijeras")
                    .setEmoji(`✂️`)
            ]);

        const embed = new EmbedBuilder()
            .setTitle(`Piedra Papel Tijeras`)
            .setDescription(`Juega al clasico juego de Piedra, Papel o Tijeras con el bot \n escoje una de estas de estas opciones`)
            .setColor(client.color);
        const m = await message.channel.send({ embeds: [embed], components: [options] });

        const collector = m.createMessageComponentCollector({ filter: int => int.user.id === message.author.id, time: 60000 });

        collector.on(`collect`, async (int: ButtonInteraction) => {
            const option = [`Piedra`, `Papel`, `Tijeras`];
            const bot = Math.floor(Math.random() * 3);
            const opt = option[bot];
            const combos = {
                "Piedra": "Tijeras",
                "Papel": "Piedra", 
                "Tijeras": "Papel"
            };
            const embed = new EmbedBuilder()
                .setDescription(`Mi eleccion: ${opt}, \n Tu eleccion: ${int.customId}`)
                .setColor(`Blurple`);

            if (int.customId === opt) {
                await int.deferUpdate();
                await m.delete();
                await message.channel.send({ embeds: [embed.setTitle("Resultado del juego: Perdiste")] });
            }


            if (combos[int.customId]  === opt) {
                await int.deferUpdate();
                await m.delete();
                await message.channel.send({ embeds: [embed.setTitle("Resultado del juego: Perdiste")] });
            } else {
                await int.deferUpdate();
                await m.delete();
                await message.channel.send({ embeds: [embed.setTitle("Resultado del juego: Perdiste")] });

            }
        });

    }
};
export default playgame;