const { MessageEmbed } = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args, f1, f2) => {
    if (args.length == 1){
        const embed1 = new MessageEmbed()
            .setColor('#16D2FC') //xanh dương nhạt
            .setTitle('Prefix')
            .setDescription('Bạn muốn thay đổi prefix để tránh trùng với các bạn máy khác hay chỉ đơn giản là không thích prefix này? À mà, chỉ tối đa 5 kí tự thôi nhé. 😦')
            .addFields(
                { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'prefix <gì đó>', inline: true },
                { name: 'Ví dụ', value: bot.config[message.guild.id].prefix + 'prefix 123', inline: true },
            )
        message.channel.send({ embeds: [embed1] });
        return;
    }
    if (args[1].length > 5){
        message.reply({ content: "Prefix chỉ được tối đa 5 kí tự." });
        return;
    }
    
    bot.config[message.guild.id].prefix = args[1];
    fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
        if (err) throw err;
    });
    const embed2 = new MessageEmbed()
        .setColor('#16D2FC') //xanh dương nhạt
        .setTitle('Prefix')
        .setDescription('Đã thành công thay đổi prefix thành: `' + args[1] +'`')
    message.channel.send({ embeds: [embed2] });
}  