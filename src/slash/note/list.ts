import { subcmd } from "../../types/endkachu";
import {paginas} from "../../structures/functions";
import noteSchema from "../../Schemas/noteSchema";

const list: subcmd = {
    subcommand: `note.list`,
    async run(client, int) {
        const data = await noteSchema.findOne({ guild: int.guild.id, user: int.member.user.id });
        if (!data) return int.reply(`no añadiste una nota`);

        if (data.notes.length == 0) return int.reply(`no añadiste una nota`);


        paginas(int, 0x3f7ede, `Notas de usuario ${int.member.user.id}`, 2, data.notes.map((note, index) =>
            `\n ————————》✧《————————— \n ID: ${index} \n Fecha: <t:${Math.round(
                note.fecha / 1000
            )}> \n Titulo: ${note.titulo} \n **Nota:** \n ${note.nota}`
        )
        );
    }
};

export default list;