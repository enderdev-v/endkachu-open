import { cmd } from '../../types/endkachu';
import { setAct } from '../../structures/functions';

const reseted: cmd = {
	name: 'customactivity',
	alias: ['ca', "custacty"],
	description: 'Reset the bot',
	usage: 'reset',
	userPerms: [],
	botPerms: [],
	isOwner: true,
	run: async (client, message, args) => {
		try {

			message.reply(`Custom activity ha sido cambiado a ${!args.join(" ") ? "default" : args.join(" ")}`);
			setAct(client, args.join(" "));
		} catch (e) {
			console.error(e);
		}
	},
};
export default reseted; 