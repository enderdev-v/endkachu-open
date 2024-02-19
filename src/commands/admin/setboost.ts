import { AttachmentBuilder, ChannelType, EmbedBuilder } from "discord.js";
import { cmd } from "../../types/endkachu";
import boostSchema from "../../Schemas/boostSchema";

const setboost: cmd = {
    name: "setboost",
    alias: [],
    description: "Configura los mensajes boost",
    usage: "setboost <message, channel, image> <options>",
    userPerms: [],
    botPerms: [],
    isOwner: false,
    run: async (client, message, args) => {
        
   
        const opts = ["message", "channel", "image", "test"];
		const saveData = async (data: object) => {
			return await boostSchema.findOneAndUpdate(
				{ guild: message.guild.id },
				data,
				{ new: true, upsert: true }
			);
		};
		

		const data = await boostSchema.findOne({ guild: message.guild.id });
		const option = args[0];
		const opt = args.slice(1).join(' ');

		if (!option) return message.reply({ embeds: [{ title: 'Error', color: 0xe14e2c, description: `no pusiste una opción \n opciones: antilinks, watermark, logs` }] });
		const snap = (items: string[], m: string) => {
			const d = m.toLowerCase();
			const result = items.filter(item => {
				if(!d.startsWith(item[0])) return;
				return d.split("").every(element => item.includes(element));  
			});
			
			return result;
		};
		
		const obj = {
			message: (type: string) => {
				console.log(type);
				if (!type) return message.reply({ embeds: [{ title: 'WelcomeConfig message', color: client.red, description: `No pusiste un mensaje` }] });
				saveData({ message: type });
				return message.reply({ embeds: [{ title: 'WelcomeConfig message', color: client.green, description: `${type} fue seleccionada correctamente` }] });
			},
			canal: (type: string) => {
				const ch = message.guild.channels.cache.get(type) || message.mentions.channels.first();
				if (!ch || ch.type !== ChannelType.GuildText) return message.reply({ embeds: [{ title: 'Error', color: client.red, description: `no pusiste un ch valido` }] });
				saveData({ channel: ch.id });
				return message.reply({ embeds: [{ title: 'WelcomeConfig message', color: client.green, description: `${type} fue seleccionada correctamente` }] });
			},
			image: () => {

				if (message.attachments.size < 0 || message.attachments.size > 1) return message.reply({ embeds: [{ title: 'Welcome Image', color: 0xe14e2c, description: `no pusiste una imagen` }] });
				saveData({ image: true });
				return message.reply({ embeds: [{ title: 'WelcomeConfig Image', color: client.green, description: "se a configurado la imagen del mensaje" }] });
			},
			test: () => {
				const back = "https://cdn.discordapp.com/attachments/988614407930146906/1192195459121418400/OIP.png?ex=65a8318b&is=6595bc8b&hm=9ff96826c3907e95c004249668105bf8391edd3f171f57bf37574e486c156d0b&";
				let str = !data || !data.message ? `Wow {user} acaba de boostear este servidor` : data.message;
				str = str.replace("{user}", message.author.username).replace("{servername}", message.guild.name);
				const attachment = new AttachmentBuilder(back, { name: 'welcome.png' });
				const embed = new EmbedBuilder()
					.setTitle('<:wow:963550260863590492> Nuevo Boost')
					.setDescription(str)
					.setThumbnail(message.author.avatarURL({ forceStatic: true}))
					.setImage('attachment://welcome.png')
					.setColor(0x008a59);
				message.channel.send({ embeds: [embed], files: [attachment] });
			}
		};
		const x = `${snap(opts, option)}`;

		console.log(x);
		const ejecutar = obj[x];
		console.log(option, "opt");
		ejecutar(opt);
    }
};
export default setboost;