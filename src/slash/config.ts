import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { slashcmd } from "../types/endkachu";

const config: slashcmd = {
    data: new SlashCommandBuilder()
        .setName(`config`)
        .setDescription(`Configura al bot`)
        .addSubcommand(subcommand => subcommand
            .setName('setprefix')
            .setDescription('Configura el prefix del bot')
            .addStringOption(option =>
                option.setName('prefix')
                    .setDescription('escribe el prefix que quieres para el bot')
                    .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
};

export default config;