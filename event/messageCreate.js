const bot = require("../index.js").bot;
const functions = require("../function/function_newcomer.js");
const f1 = "./data/guild.json";
const f2 = "./data/user.json";

bot.on('messageCreate', async message=>{
    if (message.author.bot) return;
	if (message.content.includes("@here") || message.content.includes("@everyone")) return;

    bot.user.setActivity("Xin chào thế giới! 😄", { type: 'PLAYING' });

    //update datas
    functions.update_newcomer(bot, message, f1);

	//no bot channel
	if (message.channel.id == bot.config[message.guild.id].channel) return;
	
    //command
    if (message.content.substring(0, bot.config[message.guild.id].prefix.length) == bot.config[message.guild.id].prefix){
	    let args = message.content.substring(bot.config[message.guild.id].prefix.length).split(" ");
        if (!args[0]) return;
	    args[0] = args[0].toLowerCase();
        const cmd = bot.commands.get(args[0]);
        if (!cmd){
            message.reply({ content: "Xin lỗi, nhưng tôi không có cái đó. 😦" }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
            return;
        }
        cmd.run(bot, message, args, f1, f2);
    }
    else{
        if (message.mentions.has(bot.user.id)) message.channel.send({ content: 'Người máy vui vẻ A.T luôn sẵn sàng!\nDùng: `' + bot.config[message.guild.id].prefix + 'help` để xem các lệnh của tôi nhé~' }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
    }
});