const { ActivityType } = require("discord.js")
const chalk = require("chalk")
module.exports = {
	name: `ready`,
	run (client) {
        function presence() { 
       client.user.setPresence({ 
         status: `on`, 
         activities: [{ 
           name: "!help", 
           type: ActivityType.Watching, 
         }]
       }) 
     } 
     presence() 
  
		console.log(chalk.bold.cyan`endkachu ready`)
	}
}