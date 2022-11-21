const { ActivityType } = require("discord.js")

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
  
		console.log(`endkachu ready`)
	}
}