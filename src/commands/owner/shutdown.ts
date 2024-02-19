import { cmd } from '../../types/endkachu';
const shutdown: cmd = {
	name: 'shutdown',
	alias: ['stop', "st"],
	description: 'Stop the bot',
	usage: 'stop',
	userPerms: [],
	botPerms: [],
	isOwner: true,
	run: async (client, message) => {
		try {
			await message.reply("Apagando...");
			client.destroy();
		} catch (e) {
			console.error(e);
		}
	},
};
export default shutdown; 