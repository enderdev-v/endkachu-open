import { EmbedBuilder } from "discord.js";
import { subcmd } from "../../types/endkachu";

const sayembed: subcmd = {
    subcommand: "util.sayembed",
    run: async (client, int) => {
        const desc = int.options.getString("descripcion");
        const texto = int.options.getString("texto");
        const title = int.options.getString("titulo");

        const color = int.options.getString("color") ?? `3f7ede`;
        const footer = int.options.getString("footer") ?? `Servidor ${int.guild.name}`;
        const scolor = color.includes("#") ? color.replace("#", "") : color.includes("0x") ? color.replace("0x", "") : color;
        const HexColor = (hex) => {
            return typeof hex === 'string'
                && hex.length === 6
                && !isNaN(Number('0x' + hex));
        };

        const hex = !HexColor(scolor) ? `0x3f7ede` : scolor;
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setThumbnail(int.guild.iconURL())
            .setDescription(desc)
            .setColor(parseInt(hex))
            .addFields(
                {
                    name: "Anuncio:",
                    value: texto,
                    inline: false
                }
            )
            .setFooter({ text: footer });
        int.reply({ content: `Tu mensaje fue enviado correctamente`, ephemeral: true });
        int.channel.send({ embeds: [embed] });


    }
};

export default sayembed;