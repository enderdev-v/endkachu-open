const { AttachmentBuilder } = require(`discord.js`); 
const { registerFont } = require("canvas") 
registerFont(`./public/fonts/OleoScript-Bold.ttf`, { family: `OleoScript` });
 module.exports = { 
   name: "create-meme", 
   alias: [],
   description: "Crea un meme con tu propia plantilla o platilla de pikachu sorprendido",
   userPerms: [], 
   botPerms: [], 
  
   async run(client, message, args){ 
  
      let back = message.attachments.first()?.url;
     if (!back) back = "https://media.discordapp.net/attachments/1043874124252065843/1050979793547558972/OIP.jpg"
      let texto = args.join(" ")
     console.log(texto.split("").length)
     if (texto.split(" ").length % 2 !== 0) texto = texto + " "
     if (!texto) return message.reply("no pusiste el mensaje")
     let a = texto.split(" ").length / 2
      
       // Canvas 
     const Canvas = require("canvas") ,
     canvas = Canvas.createCanvas(474, 468),
     ctx = canvas.getContext("2d") 
       // Imagen 
     const background = await Canvas.loadImage(back) 
     ctx.drawImage(background, 0, 0) 
     ctx.fillStyle = "#0000000" 
     ctx.textAlign = "start"    
      ctx.font = "30px Roboto Regular"  
     ctx.fillText(`${texto.split(" ", a).join(" ")} \n ${texto.split(" ").slice(a).join(" ")}`, 15, 55)

         let attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "meme.png" });

     message.reply({ files: [attachment] })
   } 
    
 }