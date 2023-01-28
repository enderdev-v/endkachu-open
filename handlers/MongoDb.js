module.exports = (client) => {
  const mongo = require("mongoose")
  const chalk = require("chalk")
  mongo.connect(process.env[`MongoDB`], { 
         useNewUrlParser: true,  
         useUnifiedTopology: true,
 }).then(() => { 
         console.log(chalk.bold.green`conectado correctamente a Mongo DB`) 
 }).catch((e) => { 
         console.log(chalk.bold.red`ocurrió un error al conectarse a MongoDB : ${e}`) 
    
 })

}