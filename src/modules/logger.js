// Exporting a Single Item
class Logger {
    constructor(name) {
        this.name = name;
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }

    error(error) {
        console.error(`[${this.name}] ERROR:`, error.message);
    }
}

module.exports = Logger;