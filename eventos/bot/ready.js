const { ActivityType } = require('discord.js');
const chalk = require('chalk');
module.exports = {
	name: `ready`,
	async run(client) {
		let act = [
			{
				name: `mi pagina web :3`,
				type: ActivityType.Watching
			},
			{
				name: `${client.guilds.cache.size} servidores ^^`,
				type: ActivityType.Watching
			},
			{
				name: `${client.users.cache.size} usuarios :D`,
				type: ActivityType.Watching
			},
			{
				name: `a mi comunidad <3`,
				type: ActivityType.Listening
			},
		];


		setInterval(async () => {
			function presence() {

				client.user.setPresence({
					status: `on`,
					activities: [act[Math.floor(Math.random() * act.length)]]
				});

			}
			presence()
		}, 50000)
		console.log(
			chalk.bold.cyan`Bot Ready ━━━━━━━━━━━━━┓ \n`,
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
