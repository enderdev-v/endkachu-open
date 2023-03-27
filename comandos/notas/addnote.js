const { EmbedBuilder, PermissionFlagsBits } = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);
// const {  } = require(`../../utility/funciones`)

module.exports = {
	name: 'addnote',
	alias: [],
	description: `Añade una nota a tu lista de notas \n usa !note {titulo} {nota}`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let data = await noteSchema.findOne({ perms: 'Admin' });
		if (data.perms == `admin`) {
			if (
				message.guild.members.me.permissions.has(
					PermissionFlagsBits.Administrator
				)
			)
				return console.log('Funciona');
			if (message.member.permissions.has(PermissionFlagsBits.Administrator))
				return console.log('Hola si funciono');
		} else if (data.perms == `admin-msg`) {
			if (
				message.guild.members.me.permissions.has(
					PermissionFlagsBits.ManageMessages
				)
			)
				return console.log('Funciona');
			if (message.member.permissions.has(PermissionFlagsBits.ManageMessages))
				return console.log('Hola si funciono');
		} else {
			if (
				message.guild.members.me.permissions.has(
					PermissionFlagsBits.SendMessages
				)
			)
				return console.log('Funciona');
			if (message.member.permissions.has(PermissionFlagsBits.SendMessages))
				return console.log('Hola si funciono');
		}
		await noteSchema.findOneAndUpdate(
			{ guild: message.guild.id, user: message.author.id },
			{ guild: message.guild.id, user: message.author.id },
			{ new: true, upsert: true }
		);
		let titulo = args[0];
		if (!titulo) return message.reply(`¿cual es el título de tu nota?`);

		let nota = args.slice(1).join(' ');

		if (!nota) return message.reply(`¿cual es la nota que quieres poner?`);
		let embed = new EmbedBuilder()
			.setTitle('Nota añadida')
			.setDescription(`La nota fue añadida correctamente`)
			.setColor(`Green`);

		let objeto = {
			titulo: titulo,
			fecha: Date.now(),
			nota
		};

		await noteSchema.findOneAndUpdate(
			{ guild: message.guild.id, user: message.author.id },
			{
				$push: {
					notes: objeto
				}
			},
			/*{
				
			},*/
			{ new: true, upsert: true }
		);

		message.channel.send({ embeds: [embed] });
	}
};
