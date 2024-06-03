** How to setup bot

    Get telegram bot account from @BotFather
    Get free node account from quicknode
    Add bot to group you need aand sett him addmin permissions
    check https://api.telegram.org/bot[your_bot_id]/getUpdates to get telegram_group id usualy it's negative number
    Update file params.json
    Change file logs.json permissions to writable and update "block" to block id you are starting from

** To start bot run

    DEBUG_DEPTH=5 DEBUG=action,index node index.js

** Example of systemctl service

    we use www-data user that has id 33 for cron service
    ln -s /home/buybot/buybot.service /etc/systemd/system/buybot.service
    systemctl enable buybot
    systemctl start buybot


