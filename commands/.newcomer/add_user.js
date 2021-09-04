const { MessageEmbed } = require("discord.js");
let functions = require("../../functions.js");
const fs = require("fs");

exports.run2 = (bot, message, args, f1, f2) => {
    let vVT = bot.config[message.guild.id].userS;
    let vVT_id = bot.config[message.guild.id].userz;
    let str = [];
    let i = 2;
    while (i < args.length){
        str[0] = args[i];
        if (str[0].startsWith("[")){
            str = functions.jointer(args, i);
            i = str[1];
        }
        if (message.guild.roles.cache.find(role => role.name === str[0])){
            vVT[vVT.length] = str[0];
            vVT_id[vVT_id.length] = message.guild.roles.cache.find(role => role.name === str[0]).id;
        }
        i++;				
    }
    bot.config[message.guild.id] = {
        name: bot.config[message.guild.id].name,
        prefix: bot.config[message.guild.id].prefix,
        channel: bot.config[message.guild.id].channel,
        temp: bot.config[message.guild.id].temp,
        botz: bot.config[message.guild.id].botz,
        botS: bot.config[message.guild.id].botS,
        userz: vVT_id,
        userS: vVT,
    }
    fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
        if (err) throw err;
    });
    const embed = new MessageEmbed()
        .setColor('#16FC35') 
        .setTitle('Newcomer set_user')
        .setDescription('Bạn hãy chỉnh sửa những vai trò cho người dùng mới mong muốn. Tôi sẽ thêm những vai trò có trong kênh và bỏ qua những vai trò không tồn tại!') 
        .addFields(
            { name: 'Thêm vai trò', value: bot.config[message.guild.id].prefix + 'newcomer add_user <tên vai trò_1> ... <tên vai trò_n>', inline: true },
            { name: 'Xóa vai trò', value: bot.config[message.guild.id].prefix + 'newcomer remove_user <tên vai trò_1> ... <tên vai trò_n>', inline: true },
            { name: 'Ví dụ thêm', value: bot.config[message.guild.id].prefix + 'newcomer add_user Vua Lính [Chúa Hề] [Người Quan Trọng]' },
            { name: 'Ví dụ xóa', value: bot.config[message.guild.id].prefix + 'newcomer remove_user Vua [Chúa Hề]', inline: true },
            { name: 'Những vai trò cho người dùng mới đã có', value: bot.config[message.guild.id].userS + '.' },
        )
    message.channel.send({ embeds: [embed] });
}