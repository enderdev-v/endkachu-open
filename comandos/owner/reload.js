const Discord = require(`discord.js`);
const { loadHandlers } = require('../../utility/funciones.js');
module.exports = {
	name: 'reload',
	alias: [],
	userPerms: [],
	botPerms: [],
	isDev: true,

	async run(client, message, args) {
		if (message.author.id !== '780277567537414165') return;
		message.channel
			.send({
				embeds: [
					{
						description:
							'**Recargando handlers** <a:cargando:988282702052614215>',
						color: 0x00c800
					}
				]
			})
			.then(async m => {
				loadHandlers(client);

				await m.edit({
					embeds: [
						{
							description:
								'**handlers Recargados** <a:wow:1044253839869624351>',
							color: 0x00c800
						}
					]
				});
			});
	}
};
