const { Collection } = require('discord.js');
const path = require(`node:path`);
const fs = require(`node:fs`);

module.exports = async client => {
	client.commands = new Collection();
	const commands = fs.readdirSync(`./comandos`);
	for (const folders of commands) {
		const folder = fs.readdirSync(path.join(`./comandos`, folders));
		for (const file of folder) {
			const cmd = require(path.join(`../comandos`, folders, file));
			client.commands.set(cmd.name, cmd);
		}
	}
};
