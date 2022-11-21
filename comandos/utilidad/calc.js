const Discord = require(`discord.js`);

module.exports = {
  name: "calc",
  alias: [],
  description: `sirve para calcular operaciones basicas \n usa !calc {nummero1} {signo} {numero2}`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

    let num1 = args[0];
    let sig = args[1];
    let num2 = args[2];
    
    if (!num1) return message.reply(`especifica el primer numero`)
    if (!sig) return message.reply(`especifica el signo de la operacion`)
    if (!num2) return message.reply(`especifica el segundo numero`)

    function Calc(n1, n2) {
      if (sig == "+") {
        let result = parseFloat(n1) + parseFloat(n2)
        message.channel.send(`la suma \n ${n1} + ${n2} = ${result}`)
      } else if (sig == "-") {
        let result = parseFloat(n1) - parseFloat(n2)
        message.channel.send(`la resta \n ${n1} - ${n2} = ${result}`)
      } else if (sig == "*") {
        let result = parseFloat(n1) * parseFloat(n2)
        message.channel.send(`la multiplicación \n ${n1} * ${n2} = ${result}`)
      } else if (sig == "/") {
        let result = parseFloat(n1) / parseFloat(n2)
        message.channel.send(`la division \n ${n1} / ${n2} = ${result}`)
      } else {
        message.reply(`el signo no es valido`)
      }
    }

    Calc(num1, num2)
    

  }
  
}