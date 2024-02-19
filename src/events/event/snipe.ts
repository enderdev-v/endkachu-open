import { ChannelType, Message } from "discord.js";
import snipeSchema from "../../Schemas/snipeSchema";
import { DiscordEvent } from "../../types/endkachu";

const snipe: DiscordEvent = {
	name: "messageDelete",
	run: async (client, msg: Message) => {
		
		if (msg.channel.type !== ChannelType.GuildText) return;
		const m = msg.embeds.length > 0 ? `El mensaje era un embed` : msg.content;

		await snipeSchema.findOneAndUpdate(
			{ channel: msg.channel.id },
			{
				channel: msg.channel.id,
				msg: m,
				author: msg.author.username,
				time: Math.round(Date.now() / 1000)
			},
			{ new: true, upsert: true }
		);
	}
};
export default snipe;