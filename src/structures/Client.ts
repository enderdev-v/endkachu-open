/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Options, Collection, GatewayIntentBits, REST, Routes, } from "discord.js";
import { lstatSync, readdirSync } from "node:fs";
import chalk from "chalk";
import path from "node:path";
import { slashcmd, cmd, subcmd, EventHandler, PrefixHandler, SubcmdHandler, SlashHandler } from "../types/endkachu";

export class endkachu extends Client {
	slashcmds: Collection<string, slashcmd> = new Collection();
	commands: Collection<string, cmd> = new Collection();
	subcmds: Collection<string, subcmd> = new Collection();
	red: number = 0xe14e2c;
	green: number = 0x297020;
	color: number = 0x3f7ede;
	constructor() {
		super({
			intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessageReactions],
			shards: "auto",
			makeCache: Options.cacheWithLimits({
				...Options.DefaultMakeCacheSettings,
				ReactionManager: 0,
				GuildMemberManager: {
					maxSize: 20,
					keepOverLimit: member => member.id === this.user.id,
				},
			}),
			sweepers: {
				...Options.DefaultSweeperSettings,
				messages: {
					interval: 3600,
					lifetime: 1800,
				},
			},
		});
	}
	start() {
		this.login(process.env.token);
		console.log(chalk.bold.hex("#4070f4")("endkachu logeado"));
	}
	async loadEvents() {
		const folders = readdirSync(path.join("./src/events"));
		for (const folder of folders) {
			
			const files = readdirSync(path.join("./src/events", folder));
			files.forEach(async file => {
				const event: EventHandler = await import(path.join("../events", folder, file));
				this.on(event.default.name, async (...args) => event.default.run(this, ...args));
			});
		}
	}
	async loadCommands() {
		this.commands.clear();
		const folders = readdirSync("./src/commands");
		for (const folder of folders) {
			const files = readdirSync(path.join("./src/commands", folder));
			for (const file of files) {
				const cmd: PrefixHandler = await import(path.join("../commands", folder, file));
				this.commands.set(cmd.default.name, cmd.default);
			}
		}
		console.log(chalk.italic.hex("#3990f3")(`Commands added: ${this.commands.size}`));
	}

	async loadSlashCmds() {
		this.slashcmds.clear();
		const commands: string[] = [];
		const rest = new REST({ version: "10" }).setToken(process.env.token);
		const files = readdirSync(path.join("./src/slash"));
		for (const file of files) {
			const stat = lstatSync(path.join("./src/slash", file));
			if (stat.isDirectory()) {
				const folder = readdirSync(path.join("./src/slash", file));
				for (const subfile of folder) {
					subfile;
					const subcmd: SubcmdHandler = await import(path.join("../slash", file, subfile));
					this.subcmds.set(subcmd.default.subcommand, subcmd.default);
				}
			}
			if (stat.isFile()) {
				const slashcmd: SlashHandler = require(path.join("../slash", file));
				this.slashcmds.set(slashcmd.default.data.name, slashcmd.default);
				commands.push(slashcmd.default.data.toJSON());
			}
		}
		try {
			await rest.put(Routes.applicationCommands(process.env.clientid), {
				body: commands
			});
			console.log(chalk.italic.hex("#3990f3")(`SlashCmds added: ${this.slashcmds.size}`));
		} catch (e) { console.error(e); }
	}

}