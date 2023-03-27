const { InteractionType } = require("discord.js")

module.exports = {
  name: `interactionCreate`,
  async run(client, int) {
    if (int.type !== InteractionType.ApplicationCommand) return;
    const slashcmds = client.slashcommands.get(int.commandName)
    
    if (!slashcmds) return;
		
    try {
      await slashcmds.run(client, int)
    } catch (e) {
      console.error(e)
    }
  }
}