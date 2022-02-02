const { MessageEmbed } = require("discord.js");
const bot = require("./index.js").bot;
const functions = require("./functions/function_general.js");
const f1 = "./data/guilds.json";

bot.on('guildCreate', guild => {
    functions.set_default(bot, guild.name, guild.id, f1);
    const embed = new MessageEmbed()
		.setColor('#FF1E08') //đỏ
        .setTitle('Xin chào thế giới! 😄')
		.setDescription('Cảm ơn bạn vì đã mời tôi đến chốn tuyệt vời này!\n' +
                        'Hãy sử dụng: `' + bot.config[guild.id].prefix + 'help` để xem các lệnh của tôi nhé! ❤️') 
    let trannel = ""; 
    guild.channels.cache.forEach((c) => {
        if(c.isText() && trannel == "") {
            if(c.permissionsFor(guild.me).has("SEND_MESSAGES")) {
              trannel = c;
            }
        }
    });
    trannel.send({ embeds: [embed] })
})
