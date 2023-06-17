const { setprefix } = require(`../../utility/funciones`)

module.exports = {
	name: `messageCreate`,
	async run (client, msg) {
		
		if (!msg.content.match(`<@${client.user.id}>`)) return;
		if (msg.author.bot) return;
    msg.reply({ embeds: [{ title: `Hola soy endkachu!`, description: `- ***El prefix de este servidor es: **${await setprefix(msg.guild.id)}** *** \n- ***Usa ${await setprefix(msg.guild.id)}help, para obtener mis comandos***`,  color: 0x3f7ede }], ephemeral: true })

	}
}