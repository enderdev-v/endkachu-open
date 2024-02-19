import { cmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";

const ball: cmd = {
    name: "8ball",
    alias: [],
    description: "Preguntale a la bola magica algo 🎱",
    usage: "8ball <pregunta>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const question = args.join(" ");
        if (!question) return message.reply("preguntame algo 🎱");

        const Ball = [`si`, `no`, `quiziera comprobarlo`, `por supuesto`, `claro que no`, `muy cierto`, `que dijiste`, `claro que si`];
        const Aleatorio = Math.floor(Math.random() * (Ball.length));

        const embed = new EmbedBuilder()
            .setTitle("🎱 8Ball Question")
            .setDescription("Pregunta: \n " + question)
            .addFields(
                {
                    name: `Respuesta:`,
                    value: `${Ball[Aleatorio]}`,
                    inline: false
                }
            )
            .setColor(client.color);
        message.channel.send({ embeds: [embed] });
    }
};
export default ball;