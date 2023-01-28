const Discord = require(`discord.js`);

module.exports = {
  name: "help",
  alias: [],
	description: `muestra los comandos del bot`,
  usage: `help [comando]`,
  userPerms: [],
  botPerms: [],

 async run(client, message, args){

	 if (args[0]) {
      let command = args[0];
      let cmd = client.commands.get(command);

      if (!cmd) {
        return message.channel.send("no se encontro el comando")
      } else if (cmd) {
        let description = cmd.description ? cmd.description : "No hay descripción del comando.";
        let aliases = cmd.aliases ? cmd.aliases.join(", ") : "No hay aliases del comando.";
        let botPerms = cmd.botPerms ? cmd.botPerms.join(", ") : "No hay permisos requeridos.";
        let userPerms = cmd.userPerms ? cmd.userPerms.join(", ") : "No hay permisos requeridos para el bot.";
        let uso = cmd.usage ? cmd.usage.join(", ") : "No se proporciono el uso del comando";

        let helpcmd = new Discord.EmbedBuilder()
        .setTitle(`ayuda del comando **${cmd.name}**`)
        .addFields(
      {
    name: `Nombre`,
        value: `${cmd.name}`,
     inline: true
      },
      {
        name: `Alias`,
        value: `${aliases}`,
        inline: false
      },
      {
        name: `Descripción`,
        value: `${description}`,
        inline: false
      },
      {
        name: `Permisos del bot`,
        value: `${botPerms}`,
        inline: false
      },
      {
        name: `Permisos del usuario`,
        value: `${userPerms}`,
        inline: false
      }
    )
       .setColor(0x01a0a1)
			 .setFooter(` [] opcional, {} requerido`);

        return message.channel.send({ embeds: [helpcmd] })
      } 
	 }
				
				let embed = new Discord.EmbedBuilder()
    .setTitle('✨ Hola soy  endkachu✨')
    .setColor(0x01a0a1)
    .setDescription('te brindo una lista de todas las categorías de comandos que yo tengo ')
    .addFields(
      {
       name: "◦•≫ Categorias",
       value: "<:epico:1044261418427502643> Generales \n \<:queno:1044253989803397120> Moderación \n \<:oye:1044251559988563978> Utilidad  \n <:wow:1044251815258099722> Configuracion \n  <:divertido:1044251730889670787> Diversion \n <:interesante:963559201584607373> Musica",
       inline: false
      });
    
    let general = new Discord.EmbedBuilder()
    .setTitle('<:epico:1044261418427502643> Comandos de Generales ')
    .setColor(0x01a0a1)
    .setDescription(`Comandos que son para cosas del bot para estar en una categoria aparte`)
    .addFields({
      name: "◦•≫ Comandos",
      value: `botinfo \n help \n ping \n invite \n reportbug`,
      inline: false
    })
    
    let moderacion = new Discord.EmbedBuilder()
    .setTitle('<:queno:1044253989803397120> Comandos de Moderación')
    .setColor(0x01a0a1)
    .setDescription(`Comandos para moderar tu discord con funciones simples y completas`)
    .addFields({
      name: `◦•≫ Comandos`,
      value: "ban \n kick \n tempban \n mute \n unmute \n clear \n hackban \n unban \n snipe \n warn \n unwarn \n warns",
      inline: false
    })
    
    let utilidad = new Discord.EmbedBuilder()
    .setTitle('<:oye:1044251559988563978> Comandos de Utilidad')
    .setColor(0x01a0a1)
    .setDescription(`Comandos que te seran utiles en el servidor`)
    .addFields({
      name: `◦•≫ Comandos`,
      value: "sayembed  \n serverinfo \n  userinfo \n suggest \n avatar \n servericon \n calc \n revive-chat",
      inline: false
    })
    
    
    let configuracion = new Discord.EmbedBuilder()
    .setTitle('<:wow:1044251815258099722> Comandos de Configuracion')
    .setColor(0x01a0a1)
    .setDescription(`Comandos que ayudan a que configuran y adaptan al bot a tus necesidades`)
    .addFields({
      name: `◦•≫ Comandos`,
      value: "setboost \n  set-prefix \n setleaves \n setrevive \n sayconfig \n embedmsg \n suggest-channel  \n setwelcome",
      inline: false
    })
    
    let diversion = new Discord.EmbedBuilder()
    .setTitle('<:divertido:1044251730889670787> Comandos de Diversion')
    .setColor(0x01a0a1)
    .setDescription(`Comandos que te divertiran y alegraran tu servidor`)
    .addFields({
      name: `◦•≫ Comandos`,
      value: "jumbo \n 8ball \n playgame \n game \n random \n say \n randomcolor \n create-meme \n achievement",
      inline: false
      })
    
	 let musica = new Discord.EmbedBuilder()
    .setTitle('<:interesante:1044261055280463882> Comandos de Musica')
    .setColor(0x01a0a1)
     .setDescription(`Comandos que reproducen musica conforme a lo que le pides o tambien pasarte lyrics`)
    .addFields({
      name: `◦•≫Comandos `,
      value: "play \n stop \n queue \n pause \n continue",
      inline: false
    })
    
    
    let row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.SelectMenuBuilder()
      .setCustomId("menu")
      .setMaxValues(1)
      .setPlaceholder("⚡ Seleccion de Categorias ")
      .addOptions([
        {
         label: "Generales",
         description: "comandos de información",
         value: "1",
         emoji: "1044261418427502643"
        },
        {
         label: "Moderación",
         description: "comandos de moderación",
         value: "2",
         emoji: "1044253989803397120"
        }, 
        {
         label: "Utilidad",
         description: "comandos de moderacion",
         value: "3",
         emoji: "1044251559988563978"
        },
				{
         label: "Musica",
         description: "comandos de Musica",
         value: "4",
         emoji: "1044261055280463882"
        },
        {
         label: "Configuración",
         description: "Comandos para configurar el bot",
         value: "5",
         emoji: "1044251815258099722"
        },
        {
         label: "Diversion",
         description: "Comandos para diversion",
         value: "6",
         emoji: "1044251730889670787"
        },
        {
         label: "Menu",
         description: "regresa al lista de categorias",
         value: "7",
         emoji: "1044251490677690441"
        }
      ])
    )
    const m = await message.channel.send({ embeds: [embed], components: [row] })

    const ifilter = i => i.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({filter: ifilter, time: 60000})
try {
    collector.on(`collect`, async i => {
      if(i.values[0] === `1`){
        await i.deferUpdate()
        i.editReply({ embeds: [general], components: [row] })
      }
     if(i.values[0] === `2`){
        await i.deferUpdate()
        i.editReply({ embeds: [moderacion], components: [row] })
      }
      if(i.values[0] === `3`){
        await i.deferUpdate()
        i.editReply({ embeds: [utilidad], components: [row] })
      }
			if(i.values[0] === `4`){
        await i.deferUpdate()
        i.editReply({ embeds: [musica], components: [row] })
      }
      if(i.values[0] === `5`){
        await i.deferUpdate()
        i.editReply({ embeds: [configuracion], components: [row] })
      }
      
      if(i.values[0] === `6`){
        await i.deferUpdate()
        i.editReply({ embeds: [diversion], components: [row] })
      }
      if(i.values[0] === `7`){
        await i.deferUpdate()
        i.editReply({ embeds: [help], components: [row] })
      }
    })
} catch(e)	{
  console.log(e)
}
  }
  
}