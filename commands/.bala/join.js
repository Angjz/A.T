const { MessageEmbed } = require("discord.js");
const functions = require("../../functions/function_bala.js");
const f3 = "./data/bala.json";

exports.run = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    let mention = message.mentions.users.first();

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Sử dụng: `' + bot.config[message.guild.id].prefix + 'bala join @<ai đó>`\n'+
                        'Nhưng hãy chắc chắn là họ đã mở một bàn cược nhé!')
    if (!mention){
        message.channel.send({ embeds: [embed1] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed2] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.code + '`\n'+
                        'với số tiền cược là: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n\n'+
                        'Bạn hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát bàn cược đã nhé!')
    if (bot.info[message.author.id].bala.phong == 2){
        message.channel.send({ embeds: [embed3] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Có vẻ như bạn <@' + mention.id + '> chưa ở trong bàn cược nào.\n'+
                        'Nếu bạn muốn chơi với bạn ấy thì hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala create` nhé!')
    if (!bot.info[mention.id]){
        message.channel.send({ embeds: [embed4] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    if (bot.info[mention.id].bala.phong == 0){
        message.channel.send({ embeds: [embed4] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    
    const embed5 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không có đủ tiền. 😦\n'+
                        'Bạn hãy nói với bạn `' + mention.tag + '` cân nhắc thay đổi tiền cược nhé!')
        .addFields(
            { name: 'Số tiền cược', value: bot.info[mention.id].bala.cuoc + '(VND)' },
            { name: 'Tiền của bạn', value: tien + '(VND)' },
        )
    let tiencuocz = bot.info[mention.id].bala.cuoc;
    let tiencuoc = functions.tach_tien(tiencuocz, 0);
    if (tienz < tiencuoc){
        message.channel.send({ embeds: [embed5] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    const embed6 = new MessageEmbed()
		.setColor('#FBFF08')
		.setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + mention.id + '>\n'+
						'Bàn cược: `' + bot.info[mention.id].bala.code + '`\n'+
						'<@' + message.author.id + '> đã tham gia!')
    message.channel.send({ embeds: [embed6] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
    functions.tham_gia_phong(bot, message, mention, f2, f3);
}