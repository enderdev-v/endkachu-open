import { cmd } from "../../types/endkachu";

const randomcolor: cmd = {
    name: "randomcolor",
    alias: [],
    description: "Generate a random color",
    usage: "randomcolor",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message) => {
        const caracteres = `0123456789abcdef`;

        function generateHexColor(chars) {
            let c = "#";
            for (let i = 0; i < 6; i++) c += chars.charAt(Math.floor(Math.random() * chars.length));
            return c;
        }

        const color = generateHexColor(caracteres);
        const setcolor = color.replace("#", "0x");

        message.channel.send({ embeds: [{ description: `El color random es : \n ${color}`, color: parseInt(setcolor) }] });

    },
};

export default randomcolor;