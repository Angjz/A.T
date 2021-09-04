const bot = require("../index.js").bot;
const functions = require("../functions.js");
const f1 = "./data/guilds.json";
const f2 = "./data/users.json";

bot.on('messageCreate', async message=>{
    if (message.author.bot) return;
	if (message.content.includes("@here") || message.content.includes("@everyone")) return;
    
    //update datas
    functions.update_newcomer(bot, message, f1);
    //slash command
    bot.api.applications(bot.user.id).guilds(message.guild.id).commands.post({
        data: {
            name: "help",
            description: "Xem các lệnh của tôi!"
        }})

	//no bot channel
	if (message.channel.id == bot.config[message.guild.id].channel) return;
	
    //command
    if (message.content.substring(0, bot.config[message.guild.id].prefix.length) == bot.config[message.guild.id].prefix){
	    let args = message.content.substring(bot.config[message.guild.id].prefix.length).split(" ");
	    args[0] = args[0].toLowerCase();
        const cmd = bot.commands.get(args[0]);
        if (!cmd){
            message.reply({ content: "Xin lỗi, nhưng tôi không có cái đó. 😦" });
            return;
        }
        cmd.run(bot, message, args, f1, f2);
    }
    else{
        if (message.mentions.has(bot.user.id)) message.channel.send({ content: 'Chúc bạn một ngày tốt lành!\n\nDùng: `' + bot.config[message.guild.id].prefix + 'help` để xem các lệnh của tôi nhé~' });
    }
});