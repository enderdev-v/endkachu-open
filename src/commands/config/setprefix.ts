import prefixSchema from "../../Schemas/prefixSchema";
import { cmd } from "../../types/endkachu";

const setprefix: cmd= {
    name: "setprefix",
    alias: [],
    description: "Configura el prefix del bot",
    usage: `setprefix <prefix>`,
    userPerms: [`Administrator`],
    botPerms: [`Administrator`],
    isOwner: false,
    run: async (client, message, args) => {
        const prefix = args.join(' ');

		if (!prefix) return message.reply({ embeds: [{ title: `Error prefix`, description: `No se a colocado el nuevo prefix`, color: client.red }], allowedMentions: { repliedUser: false } });
		
		await prefixSchema.findOneAndUpdate(
			{ guild: message.guild.id },
			{ prefix: prefix, guild: message.guild.id },
			{ new: true, upsert: true }
		);
        
     message.reply({ embeds: [{ title: `Cambio de Prefix`, description: `el prefix a sido cambiado a ${prefix} `, color: client.green }], allowedMentions: { repliedUser: false} });
 
    }
};

export default setprefix;