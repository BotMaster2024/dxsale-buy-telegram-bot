const fs = require('fs');
const debug = require('debug')('action');
const axios = require('axios');
const web3 = require('web3');
const TelegramBot = require('node-telegram-bot-api');

class LogReader {

    constructor(config) {
        this.file = 'logs.json';
        this.config = config.getConfig();
        this.logs = {};
        this.telegram = new TelegramBot(this.config.telegram_bot);
        if (fs.existsSync(this.file)) {
            this.logs = JSON.parse(String(fs.readFileSync(this.file)));
        }
    }

    readLogs() {
        let self = this;
        /*
        debug(ethers.toBeHex(this.logs.block));
        return 1;
        */
        axios.post(
            this.config.node,
            {
                "jsonrpc":"2.0",
                "method":"eth_getLogs",
                "params": [{
                    "fromBlock": web3.utils.toHex(this.logs.block),
                    "address": [this.config.contract]
                }],
                "id": Date.now()
            }
        ).then(function(response) {
            if (response.data && response.data.result) {
                for (let i = 0; i < response.data.result.length; i++) {
                    let buy = {
                        buyer: web3.eth.abi.decodeParameter('address', response.data.result[i].topics[1]),
                        amount: web3.utils.fromWei(web3.eth.abi.decodeParameters(['uint256', 'uint256'], response.data.result[i].data)[0], 'ether'),
                        transaction: response.data.result[i].transactionHash
                    }
                    debug(buy);
                    let message = self.config.telegram_message.replace('[buyer]', buy.buyer).replace('[amount]', buy.amount).replace('[transaction]', buy.transaction);
                    self.telegram.sendVideo(self.config.telegram_group, self.config.telegram_video, {caption: message, parse_mode: 'HTML'});
                    self.logs.block = web3.utils.hexToNumber(response.data.result[i].blockNumber) + 1;
                }
                debug(self.logs.block);
                fs.writeFileSync(self.file, JSON.stringify(self.logs));
            }
        });
    }

}


module.exports = LogReader
