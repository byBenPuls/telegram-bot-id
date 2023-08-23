const TelegramBot = require('node-telegram-bot-api');
const config = require('./loader.json')
const bot = new TelegramBot(config.token, {polling: true});
const start = "Returns your id and username/name";
const about = "About the bot";
const forwarded = "You can submit forwarded message to me and i say you: author id and author username/name";
const commands = [{command: '/start', description: start}, {command: '/about', description: about}];

bot.setMyCommands(commands);

bot.on("polling_error", (err) => {
    console.log(err);
});

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    const chatU = msg.chat.username;
    const chatN = `${msg.chat.first_name} ${msg.chat.last_name}`;
    if (msg.text == '/start') {
        if (msg.chat.username == undefined) {
            bot.sendMessage(chatId, `
🆔 Your ID: <code>${chatId}</code>
🚻 Your name: <code>${chatN}</code>
`, {parse_mode: 'HTML'})
        }
       else {
           bot.sendMessage(chatId, `
🆔 Your ID: <code>${chatId}</code>
🚻 Your username: @${chatU}
`, {parse_mode: 'HTML'})
       }
    }
    if (msg.text == '/about') {
        bot.sendMessage(chatId, `
Hey, i am created by Ben Puls.

<b>Links:</b>
<a href="https://github.com/byBenPuls/telegram-bot-id">GitHub public repository</a>
<a href="https://github.com/byBenPuls">GitHub Profile</a>

<b>Commands:</b>
/start - ${start}
/about - ${about}
${forwarded}

        `, {parse_mode: 'HTML', disable_web_page_preview: true})
    }
    else {
        const forwardId = msg.forward_from.id;
        const forwardU = msg.forward_from.username;
        const forwardN = `${msg.forward_from.first_name} ${msg.forward_from.last_name}`;

            if (forwardU == undefined) {
                bot.sendMessage (chatId, `
🆔 ID author msg: <code>${forwardId}</code>
🚻 Name author msg: <code>${forwardN}</code>
`, {parse_mode: 'HTML'})
            } else if (forwardU) {
                bot.sendMessage (chatId, `
🆔 ID author msg: <code>${forwardId}</code>
🚻 Username author msg: @${forwardU}
`, {parse_mode: 'HTML'})
            }
    }
});
