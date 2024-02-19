import noteSchema from "../../Schemas/noteSchema";
import { cmd } from "../../types/endkachu";
import { EmbedBuilder } from "discord.js";
const addnote: cmd  = {
    name: "addnote",
    alias: [],
    description: "Añade una nota a tu lista",
    usage: "addnote <Titulo> <Contenido>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async(client, message, args) => {
        await noteSchema.findOneAndUpdate(
            { guild: message.guild.id, user: message.author.id },
            { guild: message.guild.id, user: message.author.id },
            { new: true, upsert: true }
        );
        const titulo = args[0];
        if (!titulo) return message.reply(`¿cual es el título de tu nota?`);

        const nota = args.slice(1).join(' ');

        if (!nota) return message.reply(`¿cual es la nota que quieres poner?`);
        const embed = new EmbedBuilder()
            .setTitle('Nota añadida')
            .setDescription(`La nota fue añadida correctamente`)
            .setColor(client.color);

        const objeto = {
            titulo: titulo,
            fecha: Date.now(),
            nota
        };

        await noteSchema.findOneAndUpdate(
            { guild: message.guild.id, user: message.author.id },
            { $push: { notes: objeto } },
            { new: true, upsert: true }
        );

        message.channel.send({ embeds: [embed] });
    }
};
export default addnote;