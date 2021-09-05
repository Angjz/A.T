const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const f3 = "./data/bala.json";

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    let mention = message.mentions.users.first();

    const embed6 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n'+
                        'và đang đợi bạn: `' + bot.info[message.author.id].bala.o_tag + '` rồi.\n\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
                        'Hoặc dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát phòng nhé!')
    if (bot.info[message.author.id].bala.phong == 1){
        message.channel.send({ embeds: [embed6] });
        return;
    }

    const embed7 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed7] });
        return;
    }

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Sử dụng: `' + bot.config[message.guild.id].prefix + 'bala join @<ai đó>`\n'+
                        'Nhưng hãy chắc chắn là bạn đã được họ mời nhé!')
    if (!mention){
        message.channel.send({ embeds: [embed1] });
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Có vẻ như bạn <@' + mention.id + '> chưa ở trong bàn cược nào.\n'+
                        'Nếu bạn muốn chơi với bạn ấy thì hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala play` nhé!')
    if (!bot.info[mention.id]){
        message.channel.send({ embeds: [embed2] });
        return;
    }
    
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bàn này không dành cho bạn. 😦\n'+
                        'Nếu bạn muốn chơi với bạn ấy thì hãy cho bạn ấy biết nhé!')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không có đủ tiền. 😦\n'+
                        'Bạn hãy nói với bạn `' + mention.tag + '` cân nhắc thay đổi tiền cược nhé!')
        .addFields(
            { name: 'Số tiền cược', value: bot.info[mention.id].bala.cuoc + '(VND)' },
            { name: 'Tiền của bạn', value: tien + '(VND)' },
        )
    const embed5 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
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

    let tiencuocz = bot.info[mention.id].bala.cuoc;
    let tiencuoc = 0;
    tiencuoc = functions.tach_tien(tiencuocz, tiencuoc);
    if (tienz < tiencuoc){
        message.channel.send({ embeds: [embed4] });
        return;
    }
    
    message.channel.send({ embeds: [embed5] });
    functions.tham_gia_phong(bot, message, mention, f2, f3);
}