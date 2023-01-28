const { setprefix } = require(`../../utility/funciones`)

module.exports = {
	name: `messageCreate`,
	async run (client, message) {
		
		if(!message.content.match(`<@${client.user.id}>`)) return;

    message.reply(`hola este es mi prefix \n\ Prefix: ${await setprefix(message.guild.id)}`)

	}
}