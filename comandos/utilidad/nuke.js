const Discord = require(`discord.js`); 
  
 module.exports = { 
   name: "nuke", 
   alias: [], 
	 description: "limpia todo el canal de mensajes",
   userPerms: [`Administrator`], 
   botPerms: [`Administrator`],
	 isOwner: false,
   usage: `!nuke`, 
	 
   async run(client, message, args){ 
  
		 let posicion = message.channel.position;
  
		 message.channel.clone().then( async (canal) => {
  
      message.channel.delete() 
      canal.setPosition(posicion) 
		  let embed = {
				 description: `<:check:963554878200901692> canal nukeado exitosamente `,
	       color: 0x3f7ede,
	       title: `Canal nuked`
			}
			 
			 await canal.send({ embeds: [embed] }).then(m => { 
					setTimeout(() => { 
		        m.delete() 
				  }, 6000)   
      
			 }); 
     }) 
 
  
   } 
    
 }