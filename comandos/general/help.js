const Discord = require(`discord.js`);

module.exports = {
	name: 'help',
	alias: [],
	description: `muestra los comandos del bot`,
	usage: `help [comando]`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		if (args[0]) {
			let cmd = client.commands.get(args[0]);

			if (!cmd) {
				return message.channel.send('no se encontro el comando');
			} else if (cmd) {
				let desc = cmd.description
					? cmd.description
					: 'No hay descripción del comando.';
				let aliases = cmd.aliases
					? cmd.aliases.join(', ')
					: 'No hay aliases del comando.';
				let botP = cmd.botPerms ? cmd.botPerms.join(', ') : 'No hay permisos requeridos.';
				let userP = cmd.userPerms ? cmd.userPerms.join(', ') : 'No hay permisos requeridos para el bot.';
				let uso = cmd.usage
					? cmd.usage.join(' ')
					: 'No se proporciono el uso del comando';

				let helpcmd = {
					title: `ayuda del comando **${cmd.name}**`,
					description: `**Descripción del comando** \n ${desc}`,
					fields: [
						{
							name: `alias`,
							value: `${aliases}`
						},
						{
							name: `Permisos del bot`,
							value: `${botP}`
						},
						{
							name: `Permisos del usuario`,
							value: `${userP}`
						}
					],
					color: 0x3f7ede,
					footer: { text: ` [] opcional, {} requerido` }
				};
				return message.channel.send({ embeds: [helpcmd] });
			}
		}

		let embed = new Discord.EmbedBuilder()
			.setTitle('✨ Hola soy  endkachu✨')
			.setColor(0x3f7ede)
			.setDescription(
				'te brindo una lista de todas las categorías de comandos que yo tengo '
			)
			.addFields({
				name: '◦•≫ Categorias',
				value:
					'<:interesante:1044261055280463882> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas',
				inline: false
			});

		let row = new Discord.ActionRowBuilder().addComponents(
			new Discord.SelectMenuBuilder()
				.setCustomId('menu')
				.setMaxValues(1)
				.setPlaceholder('⚡ Seleccion de Categorias ')
				.addOptions([
					{
						label: 'Generales',
						description: 'comandos de información',
						value: 'general',
						emoji: '1044261055280463882'
					},
					{
						label: 'Moderación',
						description: 'comandos de moderación',
						value: 'mod',
						emoji: '1044253989803397120'
					},
					{
						label: 'Utilidad',
						description: 'comandos de moderacion',
						value: 'util',
						emoji: '1044251559988563978'
					},
					{
						label: 'Configuración',
						description: 'Comandos para configurar el bot',
						value: 'config',
						emoji: '1044251815258099722'
					},
					{
						label: 'Diversion',
						description: 'Comandos para diversion',
						value: 'funny',
						emoji: '1044251730889670787'
					},
					{
						label: 'Notas',
						description: 'Comandos de notas',
						value: 'notes',
						emoji: '1044261418427502643'
					},
					{
						label: 'Menu',
						description: 'regresa al lista de categorias',
						value: 'home',
						emoji: '1044251490677690441'
					}
				])
		);
		const m = await message.channel.send({
			embeds: [embed],
			components: [row]
		});
	}
};
