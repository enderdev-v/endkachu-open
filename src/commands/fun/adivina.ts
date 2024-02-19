import { cmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";
const adivina: cmd = {
    name: "adivina",
    alias: [],
    description: "adivina",
    usage: "adivina",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const regexp = /^[1-9]|10$/;
        const cantidad = args[0];
        if (!cantidad || !regexp.test(cantidad)) return message.reply("escribe una cantidad valida");
        const num = Math.floor(Math.random() * 10);
        const embed = new EmbedBuilder()
            .setTitle("Juego de adivinar numeros")
            .addFields(
                {
                    name: `Tu numero`,
                    value: `${cantidad}`,
                    inline: false
                },
                {
                    name: `Mi Numero`,
                    value: `${num}`,
                    inline: false
                }
            )
            .setColor(client.color);
        if (String(num) == cantidad) {
            message.channel.sendTyping;
            message.channel.send({ embeds: [embed.setDescription("**Le acertaste**")] });
        } else {
            message.channel.sendTyping;
            message.channel.send({ embeds: [embed.setDescription("**No le acertaste**")] });
        }
    }
};
export default adivina;