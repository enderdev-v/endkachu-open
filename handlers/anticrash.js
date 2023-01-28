const chalk = require("chalk")
module.exports = (client) => {
  
  process.removeAllListeners();
  
  process.on('unhandledRejection', e => {
    console.error(chalk.bold.bgRed`AntiCrash System:`, e);
}); 
  process.on('uncaughtException', (e, origin) => {
     console.error(chalk.bold.bgRed`AntiCrash System:`);
     console.log(e, origin)
  }); 
  process.on('uncaughtExceptionMonitor', (e, origin) => {
    console.error(e, origin);
}); 
  process.on('multipleResolved', error => {}); 
}