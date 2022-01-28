const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    let mention = message.mentions.users.first();
    let output = '';

    if (!mention) output = message.author.id;
    else output = mention.id;
    if (output == bot.user.id) rate = 227;
    else rate = (bot.info[output].bala.cthang / bot.info[output].bala.choi * 100).toFixed(1);

    const embed = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - thông tin người chơi')
        .setDescription('<@' + output + '>')
        .addFields(
            { name: 'Tên', value: bot.info[output].ten + '', inline: true },     
            { name: 'Đã chơi', value: bot.info[output].bala.choi+ '', inline: true },
            { name: 'Thắng', value: bot.info[output].bala.cthang + '', inline: true },
            { name: 'Tỉ lệ thắng', value: rate + '%', inline: true },
            { name: 'Ba cào', value: bot.info[output].bala.ba_cao + '', inline: true },
            { name: 'Bù', value: bot.info[output].bala.bu + '', inline: true },
            { name: 'Chuỗi thắng', value: bot.info[output].bala.streak1 + ' ván' },
            { name: 'Tiền', value: bot.info[output].bala.tien + '(VND)' }
        )
    message.channel.send({ embeds:[embed] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
}