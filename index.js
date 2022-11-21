const { IntentsBitField, Client, Collection } = require(`discord.js`);
const intents = new IntentsBitField();
const client = new Client({ intents: 131071 }); 

const keepAlive = require('./server.js');

const express = require("express")().get("/", (req,res)=>res.send("endkachu listo")).listen(3000)


const path = require(`path`)
const fs = require(`fs`)
// Mongo DB

const mongoose = require(`mongoose`);

mongoose.connect(process.env[`mongo`], {
	useNewUrlParser: true, 
	useUnifiedTopology: true
}).then(() => {
	console.log(`conectado correctamente a Mongo DB`)
}).catch((e) => {
	console.log(`ocurrió un error al conectarse a MongoDB`)
  
})

// Distube 

const { DisTube } = require('distube');
client.distube = new DisTube(client, {
  emitNewSongOnly: true,
	leaveOnStop: false, 
	leaveOnFinish: false, 
	leaveOnEmpty: true, 
	
})

// Handler 
const events = fs.readdirSync(path.join(__dirname, `eventos`))
for(const file of events) {
	const event = require(path.join(__dirname, `eventos`, file))
		client.on(event.name, async (...args) => event.run(client, ...args));
	}

client.commands = new Collection()
	const commands = fs.readdirSync(path.join(__dirname, `./comandos`))
for(const folders of commands){
	const folder = 	fs.readdirSync(path.join(__dirname, `./comandos`, folders))
	for(const file of folder) {
	const cmd = require(path.join(__dirname, `./comandos`, folders, file))
		client.commands.set(cmd.name, cmd);
	}
}


client.slashcommands = new Collection();
const slashcommandsFiles = fs.readdirSync(`./slashs`)
for(const file of slashcommandsFiles){
  const slash = require(path.join(__dirname, `./slashs` , file))
 client.slashcommands.set(slash.data.name, slash)

}


// evento distube

client.distube.on("playSong", async (queue, song) => {

  queue.textChannel.send(`Reproduciondo ahora. ${song.name}`)
});

client.distube.on("addSong", async (queue, song) => {

queue.textChannel.send(`Cancion añadida: ${song.name}`)

});

/*
Para poner el evento Debug


client.on("debug", (e) => console.log(e)) 

*/ 

client.login(process.env[`token`])

console.log(`Iniciado con node ${process.version}`)