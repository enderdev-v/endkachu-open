const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	SelectMenuBuilder
} = require(`discord.js`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(`Muestra una lista de mis comandos`)
		.addStringOption(option =>
			option
				.setName(`comando`)
				.setDescription(`Ayuda específica de un comando mio`)
		),

	async run(client, int) {
		let comando = int.options.getString(`comando`);
		if (comando) {
			let cmd = client.commands.get(comando);

			if (!cmd) {
				return int.reply('no se encontro el comando');
			} else if (cmd) {
				let description = cmd.description
					? cmd.description
					: 'No hay descripción del comando.';
				let aliases = cmd.aliases
					? cmd.aliases.join(', ')
					: 'No hay aliases del comando.';
				let botPerms = cmd.botPerms
					? cmd.botPerms.join(', ')
					: 'No hay permisos requeridos.';
				let userPerms = cmd.userPerms
					? cmd.userPerms.join(', ')
					: 'No hay permisos requeridos para el bot.';
				//let uso = cmd.usage
				//? cmd.usage.join(', ')
				//	: 'No se proporciono el uso del comando';

				let helpcmd = {
					title: `ayuda del comando **${cmd.name}**`,
					fields: [
						{
							name: `alias`,
							value: `${aliases}`
						},
						{
							name: `Descripción`,
							value: `${description}`
						},
						{
							name: `Permisos del bot`,
							value: `${botPerms}`
						},
						{
							name: `Permisos del usuario`,
							value: `${userPerms}`
						}
					],
					color: 0x01a0a1,
					footer: { text: ` [] opcional, {} requerido` }
				};
				return int.reply({ embeds: [helpcmd] });
			}
		}

		let embed = new EmbedBuilder()
			.setTitle('✨ Hola soy  endkachu✨')
			.setColor(0x01a0a1)
			.setDescription(
				'te brindo una lista de todas las categorías de comandos que yo tengo '
			)
			.addFields({
				name: '◦•≫ Categorias',
				value:
					'<:epico:1044261418427502643> Generales \n <:queno:1044253989803397120> Moderación \n <:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n  <:divertido:1044251730889670787> Diversion \n<:epico:1044261418427502643> Notas \n <:interesante:963559201584607373> Musica',
				inline: false
			});

		let row = new ActionRowBuilder().addComponents(
			new SelectMenuBuilder()
				.setCustomId('menu')
				.setMaxValues(1)
				.setPlaceholder('⚡ Seleccion de Categorias ')
				.addOptions([
					{
						label: 'Generales',
						description: 'comandos de información',
						value: 'general',
						emoji: '1044261418427502643'
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
		const i = await int.reply({
			embeds: [embed],
			components: [row]
		});
	}
};
