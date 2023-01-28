const saySchema = require(`../../Schemas/saySchema`);

module.exports = {
	name: 'say',
	alias: [],
	description: `has que diga el bot algo usa !say {texto} `,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let data = await saySchema.findOne({ guild: message.guild.id });

		let texto = args.join(' ');

		if (!texto)
			return message.channel.send('no puedo mandar algo que esta vacio');

		if (texto.includes('@everyone') || texto.includes('@here')) {
			texto = texto.replace('@here', 'here');
			texto = texto.replace('@everyone', 'everyone');
			
		}
if (data?.antilinks || data?.antilinks === true) {
	
		if (texto.includes('https') || texto.includes('discord')) {
					txt = texto.split(' ');

			let found = txt.find(
				element =>
					element.includes('https') ||
					element.includes('http') ||
					element.includes('discord')
			);
			index = txt.indexOf(found);
			txt[index] = 'link';
			texto = txt.join(' ');
			console.log(texto, "line 37")
		}
}

		if (data?.logs) {
			if (!data || !data?.logs || !message.guild.channels.cache.get(data?.logs))
				return;
			message.guild.channels.cache.get(data.logs).send({
				embeds: [
					{
						title: `Comando Say usado por ${message.author.tag}`,
						description: `**el texto fue:** \n ${texto}`,
						color: 0xfffff
					}
				]
			});
		}

		if (!data?.watermark) {
			message.delete();
			return message.channel.send(texto);
		} else {
			switch (data?.watermark) {
				case 'footer':
					message.delete();
					message.channel.send(`${texto} \n \n de ${message.author.tag}`);
					break;
				case 'mention':
					message.reply({ content: texto });
					break;
				default:
					message.delete();

					message.channel.send(texto);

					break;
			}
		}
	}
};
