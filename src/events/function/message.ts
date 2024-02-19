import { Message, PermissionsBitField } from "discord.js";
import { DiscordEvent } from "../../types/endkachu";
import prefixSchema from "../../Schemas/prefixSchema";
import noteSchema from "../../Schemas/noteSchema";

const message: DiscordEvent = {
	name: "messageCreate",
	run: async (client, message: Message) => {
		try {

			if (message.author.bot) return;
			const canal = await noteSchema.findOne({ guild: message.guild.id });
			if (canal) {
				if (message.channel.id === canal.fastnotes) return;
			}
			const data = await prefixSchema.findOne({ guild: message.guild.id });

			const prefix = !data || !data.prefix ? "!" : data.prefix;

			if (!message.content.startsWith(prefix)) return;

			const args = message.content.slice(prefix.length).trim().split(/ +/g),
				command = args.shift().toLowerCase();
			const cmd = client.commands.find(cmd => cmd.name === command || cmd.alias && cmd.alias.includes(command));

			if (cmd) {
				if (!message.member.permissions.has(PermissionsBitField.resolve(cmd.userPerms || []))) return message.reply(`no tienes el permiso ${cmd.userPerms || []}`);
				if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(cmd.botPerms || []))) return message.reply(`no tengo el permiso ${cmd.botPerms || []}`);
				if (cmd.isOwner) {
					if (message.author.username !== "endercrack") return message.reply("no tienes permisos para ejecutar este comando");
				}
				cmd.run(client, message, args);
			}
		} catch (err) { console.log(err); }
	}
};

export default message;