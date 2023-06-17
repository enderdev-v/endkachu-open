const Discord = require(`discord.js`);
const { ButtonStyle } = require("discord.js")
module.exports = {
  name: "playgame",
  alias: [],
  description: `Piedra pale o tijeras`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args) {
    let option = [`Piedra`, `Papel`, `Tijeras`]
    let bot = Math.floor(Math.random() * 3);

    let stone = `Piedra`
    let paper = `Papel`
    let s = `Tijeras`

    function Ingame(user) {
      
        let Lose = new Discord.EmbedBuilder()
        .setTitle(`Resultado del Juego: **Perdiste**`)
        .setColor(0xe14e2c)
        .setDescription(`Mi Elección: **${option[bot]}** \n Tu Elección: **${user}**`)
      
        let Ganaste = new Discord.EmbedBuilder()
        .setTitle(`Resultado del Juego: **Ganaste**`)
        .setColor(0x297020)
        .setDescription(`Mi Elección: **${option[bot]}** \n Tu Elección: **${user}**`)
      if (user === option[bot]) {
        let empate = new Discord.EmbedBuilder()
        .setTitle(`Resultado del Juego: **Empate**`)
        .setColor(0x3f7ede)
        .setDescription(`Mi Elección: **${option[bot]}** \n Tu Elección: **${user}**`)
        message.channel.send({ embeds: [empate] })
      } else if (user === stone) {
        if (option[bot] === paper) return message.channel.send({ embeds: [Lose] })
        if (option[bot] === s) return message.channel.send({ embeds: [Ganaste] })
      } else if (user === paper) {
        if (option[bot] === s) return message.channel.send({ embeds: [Lose] })
        if (option[bot] === stone) return message.channel.send({ embeds: [Ganaste] })
      } else if (user === s) {
        if (option[bot] === stone) return message.channel.send({ embeds: [Lose] })
        if (option[bot] === paper) return message.channel.send({ embeds: [Ganaste] })
      }
    }

    let options = new Discord.ActionRowBuilder()
      .addComponents(
        [
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel(`Piedra`)
            .setCustomId("1")
            .setEmoji(`🪨`),
        
        
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel(`Papel`)
            .setCustomId("2")
            .setEmoji(`📰`),
        
        
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel(`Tijeras`)
            .setCustomId("3")
            .setEmoji(`✂️`)
        ],
      )

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Piedra Papel Tijeras`)
      .setDescription(`Juega al clasico juego de Piedra, Papel o Tijeras con el bot \n escoje una de estas de estas opciones`)
		.setColor(0x3f7ede)
    let m = await message.channel.send({ embeds: [embed], components: [options] })

    const ifilter = i => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({ filter: ifilter, time: 60000 })

    collector.on(`collect`, async i => {
      if (i.customId === `1`) {
        await i.deferUpdate()
        await m.delete()
        Ingame(stone)
      }
      if (i.customId === `2`) {
        await i.deferUpdate()
        await m.delete()
        Ingame(paper)
      }
      if (i.customId === `3`) {
        await i.deferUpdate()
        await m.delete()
        Ingame(s)
      }
    })

  }

} 