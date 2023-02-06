// The Logger class expects any logStorage object it receives to implement a write and a read method.

// Fix the LogStorageFSAdapter class so that it provides the methods the Logger class expects.

// eslint-disable-next-line @typescript-eslint/no-var-requires



const fs = require("node:fs/promises");

class Logger {
    constructor(logStorage) {
        this.logStorage = logStorage;
    }

    async info(message) {
        await this.logStorage.appendFile(`[INFO] ${message}\n`);
    }

    async error(message) {
        await this.logStorage.appendFile(`[ERROR] ${message}\n`);
    }

    async replay() {
        console.log(await this.logStorage.readFile());
    }
}

class LogStorageFSAdapter {
    constructor(filepath) {
        this.filepath = filepath;
    }

    async appendFile(message) {
        try {
            await fs.appendFile(this.filepath, `[INFO] ${message}\n`);
        } catch (error) {
            console.error(error);
        }
    }

    async readFile() {
        try {
            return await fs.readFile(this.filepath, { encoding: "utf-8" });
        } catch (error) {
            console.error(error);
        }
    }
}

const fsStorage = new LogStorageFSAdapter("output.log");

const logger = new Logger(fsStorage);

logger.info("Some information");

logger.error("A bit of an issue");

logger.error("A catastrophic error!");

logger.info("The best information");

logger.replay();