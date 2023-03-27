const Discord = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);
// const {  } = require(`../../utility/funciones`)

module.exports = {
	name: 'note-perms',
	alias: [],
	description: `Borra una nota de tu lista \n usa !delete-note {idnota}`,
	userPerms: [`Administrator`],
	botPerms: [`Administrator`],

	async run(client, message, args) {
		let option = args[0];
		if (!option)
			return message.reply({
				embeds: [
					{
						title: 'Error',
						color: 0xbc0000,
						description: `no pusiste una opción \n opciones: 1, 2, 3`
					}
				]
			});

		switch (option) {
			case '1':
				message.reply('1');
				break;
			case '2':
				message.reply('2');
				break;
			case '3':
				message.reply('3');
				break;
			default:
				message.reply({
					embeds: [
						{
							title: 'Error',
							color: 0xbc0000,
							description: `${option} no es una opción valida \n opciones: 1, 2, 3`
						}
					]
				});
				break;
		}
	}
};
