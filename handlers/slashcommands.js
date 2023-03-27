const { Collection } = require('discord.js');
const path = require(`node:path`);
const fs = require(`node:fs`);

module.exports = async client => {
	client.slashcommands = new Collection();
	
	const slashcommandsFiles = fs.readdirSync(`./slashs`);
	for (const file of slashcommandsFiles) {
		const slash = require(path.join(`../slashs`, file));
		client.slashcommands.set(slash.data.name, slash);
		
	}
};
