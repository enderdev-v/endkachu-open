const { PermissionFlagsBits } = require(`discord.js`);
const noteSchema = require(`../../Schemas/noteSchema`);
// const {  } = require(`../../utility/funciones`)

module.exports = {
	name: 'delete-note',
	alias: [],
	description: `Borra una nota de tu lista \n usa !delete-note {idnota}`,
	userPerms: [],
	botPerms: [],

	async run(client, message, args) {
		let data = await noteSchema.findOne({
			guild: message.guild.id,
			user: message.author.id
		});
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
		if (data.notes.length === 0) return message.reply('No tienes notas');
		let nota = args[0];

		if (nota < 0) return message.channel.send(`la id ${nota} no es valida`);
		if (isNaN(nota)) return message.reply(`la id ${nota} no es valida`);

		if (data.notes !== 'undefined' || data.notes !== null) {
			message.channel.send({
				embeds: [
					{
						title: 'Nota removida',
						description: 'La nota se a removido correctamente'
					}
				]
			});
			data.notes.splice(nota, 1);
			data.save();
		}
	}
};
