const { ActivityType } = require('discord.js');
const chalk = require('chalk');
module.exports = {
	name: `ready`,
	run(client) {
		function presence() {
			client.user.setPresence({
				status: `on`,
				activities: [
					{
						name: '!help',
						type: ActivityType.Watching
					}
				]
			});
		}
		presence();
     console.log(
		chalk.bold.cyan`Bot Ready ━━━━━━━━━━━┓ \n`,
		chalk.bold.cyan`║ \n`,
		chalk.bold.cyan`║`,
		chalk.bold.white`Bot ${client.user.tag} \n`,
		chalk.bold.cyan`║`,
		chalk.bold.white`Uptime ${String(new Date().toLocaleString())} \n`,
		chalk.bold.cyan`║`,
		chalk.bold.white`Creador: endercrack#4934 \n`,
		chalk.bold.cyan`║`,
		chalk.bold.white`Node: ${process.version} \n`,
		chalk.bold.cyan`║\n`,
		chalk.cyan`┗━━━━━━━━━━━━━━━━━━━━━┛`
	)
	}
};
