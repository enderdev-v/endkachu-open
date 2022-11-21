const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("miscelaneo")
    .setDescription("comandos extras o útiles")
  .addSubcommand(subcommand => subcommand
      .setName('say')
      .setDescription('hacer que el bot diga lo que quier')
      .addStringOption(option =>
      option.setName('texto')
        .setDescription('Texto para el say')
        .setRequired(true))),
  async run(client, int) {

    if (int.options.getSubcommand() === 'say') {
     const texto = int.options.getString("texto")

      await int.reply({ content: "El texto fue enviado", ephemeral: true})
      int.channel.send(texto)
    }

     
    

  }

      }