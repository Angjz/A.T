const { MessageEmbed } = require("discord.js");

exports.run2 = (bot, message, args, f1, f2) => {
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