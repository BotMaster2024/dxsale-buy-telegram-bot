const fs = require('fs');
const debug = require('debug')('action');

class Config {

    constructor(params) {
        this.file = 'params.json';
        this.config = {};
        if (params.file != null) {
            this.file = params.file;
        }
        if (fs.existsSync(this.file)) {
            this.config = JSON.parse(String(fs.readFileSync(this.file)));
        }
    }

    getConfig() {
        return this.config;
    }

}


module.exports = Config
