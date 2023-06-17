const { EmbedBuilder } = require(`discord.js`)

module.exports = {
	subcommand: `utilidad.sayembed`,
async run(client, int) {

		let desc = int.options.getString("descripcion")
    let texto = int.options.getString("texto")
    let title = int.options.getString("titulo")
		
    let color = int.options.getString("color") || `3f7ede`
	  let footer = int.options.getString("footer") || `Servidor ${int.guild.name}` 
    let scolor;
    
    const HexColor = (hex) => {
      return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
    } // Detector de Código de color 
	
		  if (!HexColor(color)) { // Comprobar si no es un Hexcolor
				scolor = `0x3f7ede`; // si no lo es usa el defaut
			} else {
				scolor = `0x${color}`
   } //  si lo es define el color
		

	
    let embed = new EmbedBuilder()
      .setTitle(title)
      .setThumbnail(int.guild.iconURL())
			.setDescription(desc)
      .setColor(parseInt(scolor))
      .addFields(
        {
          name: "Anuncio:",
          value: texto,
          inline: false
        }
      )
      .setFooter({ text: footer })
     await int.reply({ content: `Tu mensaje fue enviado correctamente`, ephemeral: true })
     int.channel.send({ embeds: [embed] })
	
	
       

}
}