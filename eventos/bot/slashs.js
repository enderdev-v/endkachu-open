const { InteractionType } = require(`discord.js`)
const chalk = require(`chalk`)
module.exports = {
	name: `interactionCreate`,
	async run(client, int) {
		if (int.type !== InteractionType.ApplicationCommand) return;
		const slashcmd = client.slashcommands.get(int.commandName);
		if (!slashcmd) return;

		try {
			if (slashcmd.data.options.length === 0 || slashcmd.data.options[0].type > 2) {
				return await slashcmd.run(client, int)
			} else {
				const subcmd = client.subcmds.get(`${int.commandName}.${int.options.getSubcommand()}`);
				await subcmd.run(client, int)
			}

		} catch (e) {
			console.log(e)
		}



	}
}