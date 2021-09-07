const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    args[1] = args[1].toLowerCase();
    const cmd = bot.newcomer.get(args[1]);
    if (!cmd){
        const embed = new MessageEmbed()
            .setColor('#16FC35') //xanh lá
            .setTitle('Newcomer')
            .setDescription('Bạn muốn có một ai đó chào mừng những người mới, đồng thời cho họ một vai trò? Hãy dùng đến tôi!')
            .addFields(
                { name: 'Lần đầu sử dụng', value: bot.config[message.guild.id].prefix + 'newcomer help' },
                { name: 'Kênh thông báo', value: bot.config[message.guild.id].prefix + 'newcomer set_channel', inline: true },
                { name: 'Vai trò máy', value: bot.config[message.guild.id].prefix + 'newcomer set_bot', inline: true },
                { name: 'Vai trò người dùng', value: bot.config[message.guild.id].prefix + 'newcomer set_user', inline: true },
                { name: '⚠️ LƯU Ý ⚠️', value:  '+ Bạn cần đặt vai trò của tôi **cao hơn** những vai trò bạn định thêm vào!\n' +
                                                '+ Bạn sẽ cần cập nhật lại "Newcomer" với mục tương ứng nếu bạn xóa kênh/vai trò nào đó.\n' +
                                                '+ Tuy nhiên, đổi tên kênh/vai trò + thay đổi vị trí kênh được chấp nhận nhé! 😄' },
            )
        message.channel.send({ embeds: [embed] }); 
        return;
    }
    cmd.run2(bot, message, args, f1, f2);
}