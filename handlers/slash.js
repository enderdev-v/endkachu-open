const Discord = require(`discord.js`)
const chalk = require(`chalk`)
const { REST } = require(`@discordjs/rest`)
const { Routes } = require(`discord-api-types/v9`);
const { clientId, guild } = require(`../utility/config.json`);
const path = require(`node:path`)
const fs = require("node:fs")

module.exports = (client) => {

  const commands = [];
  const slashcommandsFiles = fs.readdirSync(`./slashs`)

  for (const file of slashcommandsFiles) {
    const slash = require(path.join(`../slashs`, file))
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
      console.log(chalk.bold.cyan`slahscmds agregados`)
    } catch (e) {
      console.error(e)
    }
  }
}