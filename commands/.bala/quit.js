const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const f3 = "./data/bala.json";

exports.run4 = (bot, message, args, f1, f2) => {
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, bạn hiện không ở trong bàn cược nào nên không thể thoát được.')
    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu nhé!')
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('<@' + message.author.id + '>, bạn đã thoát bàn cược `' + bot.info[message.author.id].bala.code + '`.')

    if (bot.info[message.author.id].bala.phong == 0){
        message.channel.send({ embeds: [embed1] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed2] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    message.channel.send({ embeds: [embed3] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
    functions.thoat_phong(bot, message, f2, f3);
}