const { SlashCommandBuilder } = require(`discord.js`)
const prefixSchema =  require("../Schemas/prefixSchema")
const { PermissionFlagsBits } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
  .setName("config")
  .setDescription(`Configura al bot`)
  .addSubcommand(subcommand => subcommand
      .setName('setprefix')
      .setDescription('Configura el prefix del bot')
    .addStringOption(option =>
      option.setName('prefix')
        .setDescription('escribe el prefix que quieres para el bot')
        .setRequired(true)))
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async run(client, int){

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