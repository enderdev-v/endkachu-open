const leaveSchema = require('../../Schemas/leaveSchema');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { registerFont } = require('canvas');
registerFont('./public/fonts/Roboto-Regular.ttf', { family: 'Roboto' });

module.exports = {
	name: 'guildMemberRemove',
	async run(client, member) {
		let data = await leaveSchema.findOne({ guild: member.guild.id });
		if (!data) return;

		// Imagenes
		let avatar = member.user.displayAvatarURL({
			extension: 'png',
			forceStatic: true,
			size: 256
		});
		let back =
			'https://media.discordapp.net/attachments/1043874124252065843/1068679480014544986/IMG_20230127_174950.png';

		// Canvas
		const Canvas = require('canvas');
		const canvas = Canvas.createCanvas(1200, 675);
		const ctx = canvas.getContext('2d');

		// Imagen
		const background = await Canvas.loadImage(back);
		ctx.drawImage(background, 0, 0);

		const userimg = await Canvas.loadImage(avatar);
		ctx.save();

		ctx.beginPath();
		ctx.arc(460 + 256 / 2, 170 + 256 / 2, 256 / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		ctx.drawImage(userimg, 460, 175);
		ctx.restore();

		// Texto
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center';

		ctx.font = '70px "Roboto Regular"';
		ctx.fillText('Noooo', 1200 / 2, 50 + 70);

		ctx.font = '60px "Roboto Regular"';
		ctx.fillText(member.user.tag, 1200 / 2, 675 - 125 - 50);

		ctx.font = '50px "Roboto Regular"';
		ctx.fillText('Se fue del servidor :(', 1200 / 2, 675 - 50 - 50);

		let attachment = new AttachmentBuilder(canvas.toBuffer(), {
			name: 'leave.png'
		});
		if (data.channel) {
			let canal = member.guild.channels.cache.get(data.channel);
			let embed = new EmbedBuilder()
				.setTitle('Despedída <:triste:1044251669317300284>')
				.setDescription(
					`${
						member.user.username
					} se fue del servidor \n <:triste:1044251669317300284>`
				)
				.setImage('attachment://leave.png')
				.setColor(0x008a59);
			canal.send({ embeds: [embed], files: [attachment] });
		}
	}
};
