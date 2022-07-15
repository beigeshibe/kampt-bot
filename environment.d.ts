declare global {
    namespace NodeJS {
        interface ProcessEnvs {
            botToken: String;
            guildId: String;
            environment: "dev" | "prod" | "debug"
        }
    }
}

export {};