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
		console.log(chalk.italic.blue`endkachu ready`)
	}
};
