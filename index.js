const { IntentsBitField, Client, Collection } = require(`discord.js`);
const intents = new IntentsBitField();
const client = new Client({ intents: 131071 });
const chalk = require('chalk');
const { loadHandlers } = require('./utility/funciones.js');
loadHandlers(client);
// express

const express = require('express')()
	.get('/', (req, res) => res.send('endkachu listo'))
	.listen(3000);

client.login(process.env.token);
