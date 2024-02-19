import { cmd } from "../../types/endkachu";

const calc: cmd = {
    name: "calc",
    alias: [],
    description: "Calcula una expresion matematica basica",
    usage: "calc <expresion>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        const exp = args.join(" ");
        const regex = /[-+*/^()]/;
        const regexp = /\d/;
        const expe = /\((\d+)\)\(\d+[-+*/^()]\d+\)/g;

        if (!exp) return message.channel.send("Debes ingresar una expresion matematica");
      
        
        if (exp.length > 10) return message.channel.send("Debes ingresar una expresion valida (2-2, 3^2, 3x3)");
        if (!regexp.test(exp)) return message.channel.send("No ingresaste un numero");
        if (!regex.test(exp)) return message.channel.send("el signo que pusiste no es valido");

        if (expe.test(exp)) return message.reply("Debes ingresar una expresion valida");
        const str = exp.replace("^", "**").replace(/\((\d+)\)\((\d+)\)/g, '$1*$2');
        const result = eval(str);
        message.channel.send({ embeds: [{ title: `La expresion matematica`, description: `${exp} \n Da como resultado: ${result}`, color: client.color }] });
    }
};

export default calc;