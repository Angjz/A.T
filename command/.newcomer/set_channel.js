const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");

exports.run = (bot, message, args, f1, f2) => {
    temp = bot.config[message.guild.id].temp;
    if (!isNaN(temp[3])) return;
    temp[0] = message.author.id;
    const embed = new MessageEmbed()
        .setColor('#16FC35')
        .setTitle('Newcomer')
        .setDescription('Bạn có chắc muốn sử dụng kênh này để thông báo chào mừng người mới? Xin hãy xác nhận trong 30 giây.' + '<@' + temp[0] + '>\n\n' +
                        '⚠️ Lưu ý là tôi sẽ không nhận tin nhắn ở kênh dùng để thông báo nhằm tránh tràn tin nhắn nhé. ⚠️') 
        .addFields(
            { name: 'Kênh hiện tại', value: '<#' + bot.config[message.guild.id].channel + '>' },
        )
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("NC_YES")
            .setLabel("CÓ")
            .setStyle("SUCCESS"),
        new MessageButton()
            .setCustomId("NC_NO")
            .setLabel("KHÔNG")
            .setStyle("DANGER")
    );
    message.channel.send({ embeds: [embed], components: [row] })
        .then(msg=>{
            temp[1] = msg.guild.id;
            temp[2] = msg.channel.id;
            temp[3] = msg.id;

            bot.config[message.guild.id].temp = temp;
            fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
                if (err) throw err;
            });
            setTimeout(function() {
                msg.delete().catch(error => {
                    if (error.code !== 10008 && error.code !== 50013) {
                        console.error('Lỗi nữaaaaa:', error);
                    }
                    temp = bot.config[message.guild.id].temp;
                    temp[0] = temp[1] = temp[2] = temp[3] = ".";

                    bot.config[message.guild.id].temp = temp;
                    fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
                        if (err) throw err;
                    });
                });
                temp = bot.config[message.guild.id].temp;
                temp[0] = temp[1] = temp[2] = temp[3] = ".";
                
                bot.config[message.guild.id].temp = temp;
                fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
                    if (err) throw err;
                });
            }, 30000)
        }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
}