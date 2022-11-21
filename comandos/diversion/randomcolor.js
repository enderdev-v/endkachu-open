const Discord = require(`discord.js`);

//<>

module.exports = {
  name: "randomcolor",
  alias: [],
	description: `muestra colores random en hexcolor`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

    const caracteres = `0123456789abcdef`;

   function generateHexColor(chars) {
     let c = "#";
     for (let i=0; i<6; i++) c += chars.charAt(Math.floor(Math.random() * chars.length));
     return c;
     
   }

    let color = generateHexColor(caracteres);
    let setcolor = color.replace("#", "0x")

       message.channel.send({ embeds: [{ description: `El color random es : \n ${color}`, color: parseInt(setcolor) }] })

  }
  
}