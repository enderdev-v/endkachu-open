import { cmd } from '../../types/endkachu';
import { reset, setAct } from '../../structures/functions';

const reseted: cmd = {
	name: 'reset',
	alias: ['rt', "restart"],
	description: 'Reset the bot',
	usage: 'reset',
	userPerms: [],
	botPerms: [],
	isOwner: true,
	run: async (client, message) => {
		try {
			message.reply("Reiniciando...").then(async (m) => {
				await reset(client);
				m.edit("Reiniciado correctamente");
				setAct(client);
			});
		} catch (e) {
			console.error(e);
		}
	},
};
export default reseted; 