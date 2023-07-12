const prefixSchema = require(`../../Schemas/prefixSchema`)
const config = require(`../../utility/config.json`)
module.exports = {
	name: `messageCreate`,
	async run (client, msg) {
		
		let data = await prefixSchema.findOne({ guildId: msg.guild.id });
		let prefix = data === null ? config.prefix : data.prefix
		if (!msg.content.match(`<@${client.user.id}>`)) return;
		if (msg.author.bot) return;
    msg.reply({ embeds: [{ title: `Hola soy endkachu!`, description: `- ***El prefix de este servidor es: **${prefix}** *** \n- ***Usa ${await setprefix(msg.guild.id)}help, para obtener mis comandos***`,  color: 0x3f7ede }], ephemeral: true })

	}
}