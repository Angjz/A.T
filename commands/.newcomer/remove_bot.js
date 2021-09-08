const { MessageEmbed } = require("discord.js");
let functions = require("../../functions.js");
const fs = require("fs");

exports.run2 = (bot, message, args, f1, f2) => {
    let data = bot.config[message.guild.id].botS;
    let data_id = bot.config[message.guild.id].botz;
    let str = [];
    let i = 2;
    while (i < args.length){
        str[0] = args[i];
        if (str[0].startsWith("[")){
            str = functions.jointer(args, i);
            i = str[1];
        }
        for (let j = 0; j < data.length; j++){
            if (str[0] == data[j]){
                data.splice(j, 1);
                data_id.splice(j, 1);
                break;
            }
        }	
        i++;				
    }
    
    bot.config[message.guild.id].botz = data_id;
    bot.config[message.guild.id].botS = data;
    fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
        if (err) throw err;
    });
    const embed = new MessageEmbed()
        .setColor('#16FC35') 
        .setTitle('Newcomer set_bot')
        .setDescription('Bạn hãy chỉnh sửa những vai trò cho máy mới mong muốn. Tôi sẽ thêm những vai trò có trong kênh và bỏ qua những vai trò không tồn tại!') 
        .addFields(
            { name: 'Thêm vai trò', value: bot.config[message.guild.id].prefix + 'newcomer add_bot <tên vai trò_1> ... <tên vai trò_n>', inline: true },
            { name: 'Xóa vai trò', value: bot.config[message.guild.id].prefix + 'newcomer remove_bot <tên vai trò_1> ... <tên vai trò_n>', inline: true },
            { name: 'Ví dụ thêm', value: bot.config[message.guild.id].prefix + 'newcomer add_bot Máy Robot [Người Máy] [Người Quản Lí]' },
            { name: 'Ví dụ xóa', value: bot.config[message.guild.id].prefix + 'newcomer remove_bot Robot [Người Quản Lí]', inline: true },
            { name: 'Những vai trò cho máy mới đã có', value: bot.config[message.guild.id].botS + '.' },
        )
    message.channel.send({ embeds: [embed] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
}