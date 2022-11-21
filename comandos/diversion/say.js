const Discord = require(`discord.js`);
const { Util } = require(`discord.js`);

module.exports = {
  name: "say",
  alias: [],
  description: `has que diga el bot algo usa !say {texto} `,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {
    try {
      message.delete()
      let texto = args.join(" ")

      if (!texto) return message.channel.send("no puedo mandar algo que esta vacio")

      if (texto.includes("@everyone") || texto.includes("@here")) {
        texto = texto.replace(/@here/g, "here")
        texto = texto.replace(/@everyone/g, "everyone")

        
        return message.channel.send(Util.cleanContent(texto, message))
      };

      
      message.channel.send(texto)
    } catch(e) {
      console.log("F")
    }


  }

}