const { MessageEmbed } = require("discord.js");
const functions = require("../../functions/function_bala.js");
const f3 = "./data/bala.json";

exports.run = (bot, message, args, f1, f2) => {
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed1] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang không trong bàn cược nào cả \n\n'+
                        'Bạn hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala create` để tạo bàn cược mới nhé!')
    if (bot.info[message.author.id].bala.phong == 0){
        message.channel.send({ embeds: [embed2] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không phải là chủ bàn cược `'+ bot.info[message.author.id].bala.code + '`.')
    if (bot.info[message.author.id].bala.phong == 2 && bot.info[message.author.id].bala.chu == 0){
        message.channel.send({ embeds: [embed3] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    functions.bat_dau(bot, message, f2, f3);
}