import { ApplicationCommandDataResolvable, Client, Collection } from "discord.js";
import { CommandType } from "../typings/Command";
import glob from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
   commands: Collection<string, CommandType> = new Collection();

   constructor() {
    super({ intents: 32767 });
   }

   start() {
    this.registerModules();
    this.login(process.env.botToken);
   }

   async importFiles(filePath: string) {
    return (await import(filePath))?.default;
   }

   async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(`${__dirname}/../commands/*/*{.ts,.js}`);
    console.log({ commandFiles });
    commandFiles.forEach(async filePath => {
        const command: CommandType = await this.importFiles(filePath);
        if (!command.name) return;

        this.commands.set(command.name, command);
    });
   }
}