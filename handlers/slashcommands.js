const path = require(`node:path`);
const fs = require(`node:fs`);
const { Collection, REST, Routes } = require(`discord.js`);
const chalk = require(`chalk`);
const { clientId } = require(`../utility/config.json`);

module.exports = async client => {

	// Collections
	client.slashcommands = new Collection();
client.subcmds = new Collection();

	// files commands
	const commands = [];
	const slashcommandsFiles = fs.readdirSync(`./slashs`);
	const rest = new REST({ version: '10' }).setToken(process.env.token);


	// Push Commands

	for (const s of slashcommandsFiles) {
		// command
		const stat = fs.lstatSync(path.join(`./slashs`, s));
		const slash = require(path.join(`../slashs`, s));
		// subcommand
		
		if (stat.isDirectory()) {
			const folder = fs.readdirSync(path.join(`./slashs`, s));
      for (let file of folder) {
         const subcmd = require(path.join(`../slashs`, s, file))
			
				 client.subcmds.set(subcmd.subcommand, subcmd, slash);
	      
      }
      
		}
		// slash normal
		
		
			client.slashcommands.set(slash.data.name, slash);
		if (stat.isFile()){
			commands.push(slash.data.toJSON());
		}
	}

	createSlash();

	// función 

	async function createSlash() {
		try {
			await rest.put(Routes.applicationCommands(clientId), {
				body: commands
			});
			console.log(chalk.bold.cyan`slahscmds agregados`);
		} catch (e) {
			console.error(e);
		}
     
	}
};
