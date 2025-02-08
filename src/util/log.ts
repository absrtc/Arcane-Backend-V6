import chalk from 'chalk';
import { globals } from '../global/globals';

class Logger {
    private logMessage(tag: string, color: chalk.Chalk, msg: string) {
        console.log(color(`${globals.BackendName} | ${tag.toUpperCase()}:`), msg);
    }

    backend(msg: string) {
        this.logMessage('BACKEND', chalk.blue, msg);
    }

    warning(msg: string) {
        this.logMessage('WARNING', chalk.yellow, msg);
    }

    error(msg: string) {
        this.logMessage('ERROR', chalk.red, msg);
    }

    database(msg: string) {
        this.logMessage('DATABASE', chalk.magenta, msg);
    }

    xmpp(msg: string) {
        this.logMessage('XMPP', chalk.cyan, msg);
    }

    bot(msg: string) {
        this.logMessage('BOT', chalk.green, msg);
    }

    api(msg: string) {
        this.logMessage('API', chalk.blueBright, msg);
    }

    website(msg: string) {
        this.logMessage('WEBSITE', chalk.cyanBright, msg);
    }

    router(msg: string) {
        this.logMessage('ROUTER', chalk.greenBright, msg);
    }
}

export const log = new Logger();
