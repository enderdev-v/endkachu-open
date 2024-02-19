import { ActionRowBuilder, ActivityType, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, SnowflakeUtil } from "discord.js";
import { endkachu } from "./Client";

async function paginas(event, color, titulo, elements, texto) {
	const embeds = [];
	const div = elements;
	for (let i = 0; i < texto.length; i += div) {
		const desc = texto.slice(i, elements);
		elements += div;
		const embed = new EmbedBuilder().setTitle(titulo.toString()).setDescription(desc.join(" ")).setColor(color).setThumbnail(event.guild.iconURL({ dynamic: true }));
		embeds.push(embed);
	}
	let pagactual = 0;
	if (embeds.length === 1) return event.channel.send({ embeds: [embeds[0]] });
	const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
		new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setCustomId("atras")
			.setEmoji("⬅️")
			.setLabel("Atras"),
		new ButtonBuilder()
			.setStyle(ButtonStyle.Primary)
			.setCustomId("inicio")
			.setEmoji("🏠")
			.setLabel("Inicio"),
		new ButtonBuilder()
			.setStyle(ButtonStyle.Success)
			.setCustomId("avanzar")
			.setEmoji("➡️")
			.setLabel("Avanzar")
	]);

	const m = await event.channel.send({ embeds: [embeds[0].setFooter({ text: `Pagina ${pagactual + 1} / ${embeds.length}` })], components: [row] });
	const collector = m.createeventComponentCollector({ ifilter: i => i.user.id == event.author.id, time: 60000 });
	const msg = async (pag) => {
		await m.edit({ embeds: [embeds[pag].setFooter({ text: `Pagina ${pag + 1} / ${embeds.length}` })], components: [m.components[0]] });
	};
	collector.on("collect", async int => {
		if (int.customId === "atras") {
			if (pagactual !== 0) pagactual -= 1;
			else pagactual = embeds.length - 1;
		} else if (int.customId === "inicio") {
			pagactual = 0;
		} else {
			if (pagactual < embeds.length - 1) pagactual++;
			else pagactual = 0;
		}
		msg(pagactual);
		await int.deferUpdate();
		collector.resetTimer();
	});
	collector.on("end", () => {
		m.components[0].components.map(button => button.data.disabled = true);
		m.edit({ content: "El tiempo ha expirado!", embeds: [embeds[pagactual].setFooter({ text: `Pagina ${pagactual + 1} / ${embeds.length}` })], components: [m.components[0]] });
	});
}

async function userGet(event: Message, args: string[]) {
	if (!args[0]) {
		return false;
	}
	const userget = args[0] && !isNaN(Number(args[0])) && SnowflakeUtil.decode(args[0]).id !== null ? await event.guild.members.fetch(args[0]) : (await event.guild.members.fetch({ query: args[0], limit: 1,  })).first();
	const user = event.mentions.members.first() || userget;
	return user;
} 
const setAct = (client: endkachu, custommsg?: string) => {
	client.user.setActivity({
		name: "Activity custom",
		type: ActivityType.Custom,
		state: !custommsg ? "Mantenimiento - endkachu.vercel.app" : custommsg
	});
};

function reset(client: endkachu) {
	client.destroy().then(async () => {
		await client.start();
		client.loadEvents();
		client.loadSlashCmds();
		client.loadCommands();
		setAct(client);
	});
}

export {
	paginas,
	reset,
	userGet,
	setAct
};