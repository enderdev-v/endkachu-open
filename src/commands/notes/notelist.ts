import noteSchema from "../../Schemas/noteSchema";
import { paginas } from "../../structures/functions";
import { cmd } from "../../types/endkachu";
const notelist: cmd = {
    name: "notelist",
    alias: [],
    description: "Muestra la lista de notas",
    usage: "notelist",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {
        const data = await noteSchema.findOne({ guild: message.guild.id, user: message.author.id });
        if (!data) return message.reply(`no añadiste una nota`);

        if (data.notes.length == 0) return message.reply(`no añadiste una nota`);


        paginas(message, client.color, `Notas de usuario ${message.author.username}`, 2, data.notes.map((note, index) =>
            `\n ————————》✧《————————— \n ID: ${index} \n Fecha: <t:${Math.round(
                note.fecha / 1000
            )}> \n Titulo: ${note.titulo} \n **Nota:** \n ${note.nota}`
        )
        );
    }
};
export default notelist;