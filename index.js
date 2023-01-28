const { IntentsBitField, Client } = require(`discord.js`);
const intents = new IntentsBitField();
const client = new Client({ intents: 131071 });
const chalk = require('chalk');
const { loadHandlers } = require('./utility/funciones.js');
loadHandlers(client);

// express

const express = require('express')()
	.get('/', (req, res) => res.send('endkachu listo'))
	.listen(3000);

// Lavalink

client.login(process.env.token);

console.log(chalk.bold.cyan`Iniciado con node ${process.version}`);
