const { MessageEmbed } = require("discord.js");
const functions = require("../../functions/function_bala.js");
const f3 = "./data/bala.json";

exports.run = (bot, message, args, f1, f2) => {
    //embeds
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi thử lại nhé!')
    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.code + '`\n'+
                        'với số tiền cược là: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n\n'+
                        'Bạn hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát bàn cược đã rồi mới tạo bàn cược mới nhé!'+
                        'Hoặc mời người khác vào bằng: `' + bot.config[message.guild.id].prefix + 'bala join ' + message.author.tag + '`')

    //error handlers
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed1] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    if (bot.info[message.author.id].bala.phong == 2){
        message.channel.send({ embeds: [embed2] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    //start
    let tiencuoc = "10.000";
    functions.tao_phong2(bot, message, tiencuoc, f2, f3);
}