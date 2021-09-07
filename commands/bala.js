const { MessageEmbed } = require("discord.js");
const functions = require("../functions.js");

exports.run = (bot, message, args, f1, f2) => {
    if (!bot.info[message.author.id]){
        functions.set_user(bot, message, f2);
    }
    const cmd = bot.bala.get(args[1]);
    if (!cmd){
        const embed = new MessageEmbed()
            .setColor('#FBFF08') //vàng
            .setTitle('Ba lá')
            .setDescription('Cùng giải trí với trò chơi thân thuộc "bài ba lá" nào! 😆')
            .addFields(
                { name: 'Luật chơi', value: bot.config[message.guild.id].prefix + 'bala help', inline: true },
                { name: 'Xem thông tin', value: bot.config[message.guild.id].prefix + 'bala stat', inline: true },
                { name: 'Bảng xếp hạng', value: bot.config[message.guild.id].prefix + 'bala top', inline: true },
                { name: 'Thưởng tiền', value: bot.config[message.guild.id].prefix + 'bala daily', inline: true },
                { name: '\u200b ', value: '\u200b', inline: true },
                { name: 'Làm việc', value: bot.config[message.guild.id].prefix + 'bala work', inline: true },        
                { name: 'Chơi với A.T', value: bot.config[message.guild.id].prefix + 'bala play', inline: true }, 
                { name: '\u200b ', value: '\u200b', inline: true },
                { name: 'Chơi nhiều người', value: bot.config[message.guild.id].prefix + 'bala create', inline: true },              
                
            )
        message.channel.send({ embeds: [embed] }); 
        return;
    }
    cmd.run4(bot, message, args, f1, f2);
}