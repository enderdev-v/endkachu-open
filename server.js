/*const express = require('express');
const server = express();

server.all('/', (req, res) => {
	res.send('ok');
});

function keepAlive() {
	server.listen(3000, () => {
		console.log('Claro que yes pa' + Date.now());
	});
}
keepAlive()
module.exports = keepAlive;*/
const e=require("express")();function o(){e.listen(3e3,(()=>{console.log("Claro que yes pa"+Date.now())}))}e.all("/",((e,o)=>{o.send("ok")})),o(),module.exports=o;