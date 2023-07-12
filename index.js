const { IntentsBitField, Client } = require(`discord.js`)
const client = new Client({ intents: Object.keys(IntentsBitField.Flags) });
const { loadHandlers } = require('./utility/funciones.js');
loadHandlers(client);

require("express")().get("/",((e,s)=>s.send("endkachu listo"))).listen(3e3);


client.login(process.env.token);