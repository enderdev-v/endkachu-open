const { SlashCommandBuilder } = require(`discord.js`)
const Discord = require(`discord.js`);
const prefixSchema = require(`../Schemas/prefixSchema`)


module.exports = {
  data: new SlashCommandBuilder()
    .setName("utilidad")
    .setDescription(`Comandos de utilidad`)
    .addSubcommand(subcommand => subcommand
      .setName('calc')
      .setDescription('calcula dos numeros en operaciones basicas')
    .addStringOption(option =>
      option.setName('numero')
        .setDescription('escribe el primer Numero')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('numero2')
        .setDescription('escribe el Segundo Numero')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('signo')
        .setDescription('Escribe el signo de la operacion')
        .setRequired(true))),
  async run(client, int) {

    if (int.options.getSubcommand() === `calc`) {
      const num = int.options.getString(`numero`)
      const num2 = int.options.getString('numero2')
      const sig = int.options.getString('signo')

      function Calc(n1, n2) {
        if (sig == "+") {
          let result = parseFloat(n1) + parseFloat(n2)
          return `la suma \n ${n1} + ${n2} = ${result}`
        } else if (sig == "-") {
          let result = parseFloat(n1) - parseFloat(n2)
          return `la resta \n ${n1} - ${n2} = ${result}`
        } else if (sig == "*") {
          let result = parseFloat(n1) * parseFloat(n2)
          return `la multiplicación \n ${n1} * ${n2} = ${result}`
        } else if (sig == "/") {
          let result = parseFloat(n1) / parseFloat(n2)
          return `la division \n ${n1} / ${n2} = ${result}`
        } else {
          return `el signo no es valido`
        }
      }

      await int.reply(Calc(num, num2))
    }



    

  }

}