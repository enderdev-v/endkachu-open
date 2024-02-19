/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message, ChatInputCommandInteraction, Events, PermissionResolvable, SlashCommandBuilder, } from "discord.js";
import { endkachu } from "../structures/Client";

export type slashcmd = {
    data: SlashCommandBuilder | any,
    run?: (client: endkachu, int: ChatInputCommandInteraction) => void
}

export type cmd = {
    name: string
    alias: string[]
    description: string
    usage: string
    userPerms: PermissionResolvable[]
    botPerms: PermissionResolvable[]
    isOwner: boolean
    run: (client: endkachu, message: Message, args: string[]) => void
}

export type subcmd = {
    subcommand: `${string}.${string}`
    run: (client: endkachu, int: ChatInputCommandInteraction) => void
}

export interface DiscordEvent {
    name: `${Events}`,
    run: (client: endkachu, ...args?: any) => any
}

// Tipos de handlers

export type EventHandler = {
    default: {
        name: `${Events}` | string,
        run: (client: endkachu, ...args?: any) => any
    }
}

export type PrefixHandler = {
    default: {
        name: string
        alias: string[]
        description: string
        usage: string
        userPerms: PermissionResolvable[]
        botPerms: PermissionResolvable[]
        isOwner: boolean
        run: (client: endkachu, message: Message, args: string[]) => void
    }
}

export type SlashHandler = {
    default: {
        data: SlashCommandBuilder | any,
        run?: (client: endkachu, int: ChatInputCommandInteraction) => void
    }
}
export type SubcmdHandler = {
    default: {
        subcommand: `${string}.${string}`
        run: (client: endkachu, int: ChatInputCommandInteraction) => void
    }
}