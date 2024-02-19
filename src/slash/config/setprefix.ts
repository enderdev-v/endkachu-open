import { subcmd } from "../../types/endkachu";
import prefixSchema from "../../Schemas/prefixSchema";

const prefix: subcmd = {
    subcommand: `config.setprefix`,
    run: async(client, int) => {
        const prefix = int.options.getString('prefix');

        await prefixSchema.findOneAndUpdate(
            { guild: int.guild.id },
            { prefix: prefix, guild: int.guild.id },
            { new: true, upsert: true }
        );

        int.reply({ embeds: [{ title: `Cambio de Prefix`, description: `el prefix a sido cambiado a ${prefix} `, color: 0x3f7ede }] });

    }
};

export default prefix;