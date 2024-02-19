// import {  ActivityType } from "discord.js";
import { setAct } from "../../structures/functions";
import { DiscordEvent } from "../../types/endkachu";
import chalk from "chalk";


const ready: DiscordEvent = {
	name: `ready`,
	run: async (client) => {
		setAct(client);
		console.log(chalk.bold.hex('#4070f4')("endkachu ready"));
	}
};

export default ready;