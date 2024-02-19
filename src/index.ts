import path from "node:path";
import { endkachu } from "./structures/Client";
import dotenv from "dotenv";
dotenv.config();
const client = new endkachu();

import(path.join("./handlers")).then(async (handler) => {
	for (const file of handler) {
		const filePath = path.join("./handlers", file);
		const f = await import(filePath);
		f(client);
	}
});
console.log(chalk.bold.black.bgGreen`handlers cargados`);

client.loadCommands();
client.loadEvents();
client.loadSlashCmds();
client.start();