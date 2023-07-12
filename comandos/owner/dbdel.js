const Discord = require(`discord.js`); 
const leaveSchema = require('../../Schemas/leaveSchema');
const suggestSchema = require('../../Schemas/suggestSchema');
// const embedSchema = require("../../Schemas/embedSchema")
const snipeSchema = require('../../Schemas/snipeSchema');
const reviveSchema = require('../../Schemas/reviveSchema');
const warnSchema = require('../../Schemas/warnSchema');
const prefixSchema = require('../../Schemas/prefixSchema');
const welcomeSchema = require('../../Schemas/welcomeSchema');
const noteSchema = require('../../Schemas/noteSchema');
// const ssugsSchema = require("../../ssugsSchema")
const saySchema = require('../../Schemas/saySchema');

 module.exports = { 
   name: "db-del", 
   alias: [], 
   userPerms: [], 
   botPerms: [],	 
  
   async run(client, message, args){ 
  
  if (message.author.id !== '780277567537414165') return;
		 message.reply("Borrando bases de datos")
		const guild = message.guild;
		await leaveSchema.findOneAndDelete({ guild: guild.id });
		await prefixSchema.findOneAndDelete({ guildId: guild.id });
		await warnSchema.findOneAndDelete({ guildId: guild.id });
		await reviveSchema.findOneAndDelete({ guild: guild.id });
		await suggestSchema.findOneAndDelete({ guildId: guild.id });
		await prefixSchema.findOneAndDelete({ guildId: guild.id });
		await snipeSchema.findOneAndDelete({ guildId: guild.id });
		// await embedSchema.findOneAndDelete({ guildID: guild.id })
		await welcomeSchema.findOneAndDelete({ guild: guild.id });
		await noteSchema.findOneAndDelete({ guild: guild.id });
		// await ssugsSchema.findOneAndDelete({ guild: guild.id })
		await saySchema.findOneAndDelete({ guild: guild.id });
	
     await message.reply("Bases de datos eliminadas")
   } 
    
 }