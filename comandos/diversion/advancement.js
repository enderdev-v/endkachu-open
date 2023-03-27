const { AttachmentBuilder } = require(`discord.js`);

module.exports = {
	name: 'advancement',
	alias: [],
	description:
		'Crea una pantalla de logros tipo minecraft personalizada a full',
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		try {
			// Texto codigo
			let txt =
				args.join('').length >= 4 ? args.slice(1).join(' ') : args.join(' ');
			if (!txt) return (txt = 'Era de hierro');
			console.log(txt)
			// Imagenes
			const avatar = message.author.displayAvatarURL({
				extension: 'png',
				forceStatic: true,
				size: 32
			});
			back =
				'https://media.discordapp.net/attachments/1043874124252065843/1068298579904569364/IMG_20230126_163657.png'; // Canvas
			const Canvas = require('canvas');
			const canvas = Canvas.createCanvas(320, 64);
			const ctx = canvas.getContext('2d'); // Imagen
			let texto = args.join(' ');
			if (!texto) return message.reply('no pusiste el mensaje');

			const background = await Canvas.loadImage(back);
			ctx.drawImage(background, 0, 0);

			const img = message.attachments.first()?.url;

			if (img) {
				const Aimg = await Canvas.loadImage(img);
				ctx.save();

				ctx.drawImage(Aimg, 16, 16, 32, 32);
				ctx.restore();
			} else {
				const userimg = await Canvas.loadImage(avatar);
				ctx.save();

				ctx.beginPath();
				ctx.arc(16 + 32 / 2, 16 + 32 / 2, 32 / 2, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();
				// remplaza los números de ahí de arc por los números de su size
				ctx.drawImage(userimg, 16, 16);
				ctx.restore();
			} // Texto
			ctx.fillStyle = '#fdfd12';
			ctx.textAlign = 'start';
			ctx.font = '20px Roboto Regular';
			ctx.fillText('Progreso realizado', 65, 25);
			//Texto de logro
			ctx.font = '15px Roboto Regular';
			ctx.fillText(`${txt}`, 65, 45);

			let attachment = new AttachmentBuilder(canvas.toBuffer(), {
				name: 'advancement.png'
			});

			message.reply({ files: [attachment] });
		} catch (e) {
			console.log(e);
		}
	}
};
