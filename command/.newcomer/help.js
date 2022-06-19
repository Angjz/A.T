const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    const embed = new MessageEmbed()
        .setColor('#16FC35') 
        .setTitle('Newcomer')
        .setDescription('1. Tôi cần một kênh văn bản để có thể gửi lời chào mừng đến. Bạn hãy chuyển sang kênh mong muốn và cho tôi biết nhé!\n' +
                        '2. Bạn muốn cho các bạn máy mới một vai trò nào đó? Hãy cho tôi biết nhé!\n' +
                        '3. Bạn muốn cho những người dùng mới một vai trò đó? Hãy cho tôi biết nhé!')
        .addFields(
            { name: '1. Sử dụng', value: config[message.guild.id].prefix + 'newcomer set_channel' },
            { name: '2. Sử dụng', value: config[message.guild.id].prefix + 'newcomer set_bot' },
            { name: '3. Sử dụng', value: config[message.guild.id].prefix + 'newcomer set_user' },
        )
    message.channel.send({ embeds: [embed] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
}