declare global {
	namespace NodeJS {
		interface ProcessEnv {
			token: string;
			clientid: string;
			guildid: string;
			mongo: string;
		}
	}
}


export { };