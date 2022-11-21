const fs = require(`fs`)
const Discord = require(`discord.js`)
const { REST } = require(`@discordjs/rest`)
const { Routes } = require(`discord-api-types/v9`);
const { clientId, guild } = require(`./utility/config.json`);
const commands = [];
const slashcommandsFiles = fs.readdirSync(`./slashs`)
const path = require(`path`)
for (const file of slashcommandsFiles) {
  const slash = require(path.join(__dirname, `./slashs`, file))
  commands.push(slash.data.toJSON())
}

const rest = new REST({ version: "10" }).setToken(process.env[`token`])

createSlash()

async function createSlash() {
  try {
    await rest.put(
      Routes.applicationCommands(clientId), {
        body: commands
      }
    )
    console.log(`slahscmds agregados`)
  } catch (e) {
    console.error(e)
  }
} 