import { TextChannel } from "discord.js";
import { cmd } from "../../types/endkachu";

const nuke: cmd = {
    name: "nuke",
    alias: [],
    description: "Nukes the channel",
    usage: "nuke",
    userPerms: ["ManageChannels"],
    botPerms: ["ManageMessages"],
    isOwner: false,
    run: async (client, message) => {
        if (message.channel instanceof TextChannel) {
            const posicion = message.channel.position;
            message.channel.clone().then(async (canal) => {
                message.channel.delete();
                canal.setPosition(posicion);
                const embed = {
                    description: `<:check:963554878200901692> canal nukeado exitosamente `,
                    color: client.color,
                    title: `Canal nuked`
                };
                await canal.send({ embeds: [embed] }).then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 6000);

                });
            });
        } else return;
    }
};

export default nuke;