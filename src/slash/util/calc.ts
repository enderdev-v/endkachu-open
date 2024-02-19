import { subcmd } from "../../types/endkachu";

const calc: subcmd = {
    subcommand: "util.calc",
    run: async(client, int) => {
        const exp = int.options.getString("expresion");
        const regex = /[-+*/^]/;
        const regexp = /\d/;

        if (!exp) return int.reply("Debes ingresar una expresion matematica");
        if (exp.length > 6) return int.reply("Debes ingresar una expresion valida (2-2, 3^2, 3x3)");
        if (!regexp.test(exp)) return int.reply("No ingresaste un numero");
        if (!regex.test(exp)) return int.reply("el signo que pusiste no es valido");

        const str = exp.replace("^", "**");
        const result = eval(str);
        int.reply({ embeds: [{ title: `La expresion matematica`, description: `${exp} \n Da como resultado: ${result}`, color: 0x3f7ede }] });
   
    }
};

export default calc;