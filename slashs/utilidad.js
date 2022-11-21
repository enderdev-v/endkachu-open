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
        .setRequired(true)))
    .addSubcommand(subcommand => subcommand
      .setName('setprefix')
      .setDescription('Configura el prefix del bot')
    .addStringOption(option =>
      option.setName('prefix')
        .setDescription('escribe el prefix que quieres para el bot')
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

    if (int.options.getSubcommand() === 'setprefix') {
      const prefix = int.options.getString('prefix')


      if (!prefix) return int.reply(`No Pusiste el prefix`)

      let data = await prefixSchema.findOne({ guldId: int.guild.id })

      if (!data) {
        let newdata = new prefixSchema({
          prefix: prefix,
          guildId: int.guild.id
        })
        return await newdata.save()
      }
      await prefixSchema.findOneAndUpdate({
        prefix: prefix,
        guildId: int.guild.id
      })


      await int.reply(`Prefix Cambiado a ${prefix}`)

    }

    

  }

}