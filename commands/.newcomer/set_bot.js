const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
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