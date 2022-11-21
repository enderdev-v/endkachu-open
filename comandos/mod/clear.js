const Discord = require(`discord.js`);

module.exports = {
  name: "clear",
  alias: [],
	description: `borra mensajes del canal en el que se ejecuta el comando`,
  userPerms: [`ManageMessages`],
  botPerms: [`ManageMessages`],

  async run(client, message, args) {
		
    const cantidad = args[0];
    if(!cantidad) return message.reply("escribe una cantidad")
    if(isNaN(cantidad) || parseInt(cantidad <= 0)) return message.reply(`esa cantidad es 0 y tiene que ser mayor a 0`)
    if(parseInt(cantidad) > 100) return message.reply(`esa cantidad excede mis limites`)
    if(isNaN(cantidad)) return message.reply("escribe una cantidad  en numeros")

  
    try{
            
  await message.channel.bulkDelete(parseInt(cantidad) + 1, true)

await message.channel.send(`he eliminado ${cantidad} mensajes`).then(m => {
  setTimeout(() => {
       m.delete()
    }, 6000)  
    
});
    }catch (e) {
      console.error(e)
    }

    

  }

}