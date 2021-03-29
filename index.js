const d = require("discord.js");
const dotenv = require("dotenv");
const bot = new d.Client();
dotenv.config();

let serverTime = new Date();
let offset = 0;
let GMT = new Date();

function update() {
    serverTime.setTime(GMT.getTime() + offset * 60000);
}

bot.on("message", async message => {
    update()
    GMT = new Date();
    if (message.author.bot || message.channel.type == "dm") return;

    const command = message.content.split(" ")[0].toLowerCase();
    const args = message.content.split(" ").slice(1);

    if (message.content == "^now") {
        message.channel.send(serverTime.toUTCString().split(" ").slice(0, 5).join(" "));
    } else if (command == "^set") {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            offset = parseInt(args[0])
            message.reply(`You have set the server time to GMT+${offset}mins.`)
        } else {
            message.reply(`Only admins can use this command.`)
        }
    }
});

bot.login(process.env.TOKEN);