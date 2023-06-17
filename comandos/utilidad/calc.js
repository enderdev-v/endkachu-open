const Discord = require(`discord.js`);

module.exports = {
  name: "calc",
  alias: [],
  description: `sirve para calcular operaciones basicas \n usa !calc {nummero1} {signo} {numero2}`,
  userPerms: [],
  botPerms: [],

  async run(client, message, args){

    const n = args[0];
    const s = args[1];
    const n1 = args[2];
    
    if (!n) return message.reply({ embeds: [{ title: `Error`, description: `No colocaste el primer número de la operación matemática`, color: 0xe14e2c }] })
    if (!s) return message.reply({ embeds: [{ title: `Error`, description: `No colocaste el signo de la operación matemática`, color: 0xe14e2c }] })
    if (!n1) return message.reply({ embeds: [{ title: `Error`, description: `No colocaste el segundo número de la operación matemática`, color: 0xe14e2c }] })
    
		let resultado = eval(`${n} ${s} ${n1}`)
    message.channel.send({ embeds: [{ title: `La Operación matemática`, description: `${n} ${s} ${n1}`, fields: [{ name: `Resultado`, value: `${resultado}` }], color: 0x3f7ede }] })
  }
  
}