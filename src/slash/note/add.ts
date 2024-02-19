import { subcmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";
import noteSchema from "../../Schemas/noteSchema";

const add: subcmd = {
    subcommand: `note.add`,
    async run(client, int) {
        await noteSchema.findOneAndUpdate(
            { guild: int.guild.id, user: int.member.user.id },
            { guild: int.guild.id, user: int.member.user.id },
            { new: true, upsert: true }
        );
        const titulo = int.options.getString(`titulo`);
        const nota = int.options.getString(`nota`);

        const embed = new EmbedBuilder()
            .setTitle('Nota añadida')
            .setDescription(`La nota fue añadida correctamente`)
            .setColor(0x297020);

        const objeto = {
            titulo: titulo,
            fecha: Date.now(),
            nota
        };

        await noteSchema.findOneAndUpdate(
            { guild: int.guild.id, user: int.member.user.id },
            {
                $push: {
                    notes: objeto
                }
            },
            { new: true, upsert: true }
        );

        int.reply({ embeds: [embed] });

    }
};

export default add;