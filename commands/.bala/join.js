const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const f3 = "./data/bala.json";
const tiencuoc = [
    10000,
    20000,
    50000,
    100000,
    200000,
    500000,
    1000000,
    2000000,
    5000000,
    10000000,
    20000000,
    50000000
]
const tiencuoc2 = [
    '10.000',
    '20.000',
    '50.000',
    '100.000',
    '200.000',
    '500.000',
    '1.000.000',
    '2.000.000',
    '5.000.000',
    '10.000.000',
    '20.000.000',
    '50.000.000'
]

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = 0;
    tienz = functions.tach_tien(tien, tienz);
    let mention = message.mentions.users.first();

    const embed6 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược số `' + bot.info[message.author.id].bala.cuoc + '`\n'+
                        'và đang đợi bạn `' + bot.info[message.author.id].bala.o_name + '#' + bot.info[message.author.id].bala.o_dis + '` rồi.\n\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.username + '#' + message.author.discriminator + '`\n'+
                        'Hoặc dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát phòng nhé!')
    if (bot.info[message.author.id].bala.phong == 1){
        message.channel.send({ embeds: [embed6] });
        return;
    }

    const embed7 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi. Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed7] });
        return;
    }

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Sử dụng: `' + bot.config[message.guild.id].prefix + 'bala join @<ai đó>`\n'+
                        'Nhưng hãy chắc chắn là bạn đã được họ mời nhé!')
    if (!mention){
        message.channel.send({ embeds: [embed1] });
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Có vẻ như bạn <@' + mention.id + '> chưa ở trong bàn cược nào.\n'+
                        'Nếu bạn muốn chơi với bạn ấy thì hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala play` nhé!')
    if (!bot.info[mention.id]){
        message.channel.send({ embeds: [embed2] });
        return;
    }
    
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bàn này không dành cho bạn. 😦\n'+
                        'Nếu bạn muốn chơi với bạn ấy thì hãy cho bạn ấy biết nhé!')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không có đủ tiền. 😦\n'+
                        'Bạn hãy nói với bạn của bạn cân nhắc thay đổi bàn cược nhé!')
        .addFields(
            { name: 'Số tiền cược', value: tiencuoc2[bot.info[mention.id].bala.cuoc-1] + '(VND)' },
            { name: 'Tiền của bạn', value: tien + '(VND)' },
        )
    const embed5 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('<@' + message.author.id + '> đã chấp nhận lời mời của <@' + mention.id + '>\n'+
                        'Hãy để trò chơi được bắt đầu!')
    
    if (bot.info[mention.id].bala.phong == 0){
        message.channel.send({ embeds: [embed2] });
        return;
    }
    if (bot.info[mention.id].bala.o_id != message.author.id){
        message.channel.send({ embeds: [embed3] });
        return;
    }
    if (tienz < tiencuoc[bot.info[mention.id].bala.cuoc-1]){
        message.channel.send({ embeds: [embed4] });
        return;
    }
    
    message.channel.send({ embeds: [embed5] });
    functions.tham_gia_phong(bot, message, mention, f2, f3);
}