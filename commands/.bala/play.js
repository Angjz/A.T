const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const f3 = "./data/bala.json";

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    let mention = message.mentions.users.first();  

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Hãy đưa ra số tiền cược lớn hơn 1.000(VND) và rủ ai đó cùng chơi nào!\n'+
                        'Bạn cũng có thể chơi với tôi nếu không có ai chơi cùng bạn. 😉')
        .addFields(
            { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'bala play <tiền cược> @<ai đó>', inline: true },
            { name: 'Ví dụ', value: bot.config[message.guild.id].prefix + 'bala play 10.000 @Ang', inline: true },
            { name: 'Ví dụ 2', value: bot.config[message.guild.id].prefix + 'bala play all @Ang', inline: true },
            { name: 'Số tiền hiện tại của bạn ' + message.author.tag, value: tien + '(VND)' },
        )
    //typo error handler
    if (!args[2] || !mention || !mention.id){
        message.channel.send({ embeds: [embed1] });
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không đủ tiền.\n'+
                        'Xin hãy cược ít hơn. 😦')
        .addFields(
            { name: 'Số tiền hiện tại của bạn ', value: tien + '(VND)' },
        )
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể chơi với chính mình được. 😄')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn <@' + mention.id + '> hiện đang bận rồi.\n'+
                        'Hãy đợi bạn ấy xong đã nhé. 😦')
    const embed6 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n'+
                        'và đang đợi bạn: `' + bot.info[message.author.id].bala.o_tag + '` rồi.\n\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
                        'Hoặc dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát phòng nhé!')
    const embed7 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    const embed8 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn <@' + mention.id + '> chưa có tiền. 😦\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala work` sau đó là `' + bot.config[message.guild.id].prefix + 'bala daily` nhé!')
    const embed10 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể cược ít hơn 1.000(VND).\n'+
                        'Xin hãy cược nhiều hơn. 😦')
        .addFields(
            { name: 'Số tiền hiện tại của bạn ', value: tien + '(VND)' },
        )

    //error handler
    if (mention.id == message.author.id){
        message.channel.send({ embeds: [embed3] });
        return;
    }
    if (!bot.info[mention.id]){
        message.channel.send({ embeds: [embed8] });
        return;
    }
    if (bot.info[mention.id].bala.phong == 1){
        message.channel.send({ embeds: [embed4] });
        return;
    }
    if (bot.info[message.author.id].bala.phong == 1 && bot.info[message.author.id].bala.start == 0){
        message.channel.send({ embeds: [embed6] });
        return;
    }
    if (bot.info[message.author.id].bala.phong == 1 && bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed7] });
        return;
    }

    let tiencuoc = 0;
    if (args[2] === "all") tiencuoc = tienz;
    else tiencuoc = functions.tach_tien(args[2], tiencuoc);
    if (tiencuoc < 1000){
        message.channel.send({ embeds: [embed10] });
        return;
    }
    if (tienz < tiencuoc){
        message.channel.send({ embeds: [embed2] });
        return; 
    }

    //bot player
    if (mention.id == bot.user.id){
        message.channel.send({ content: 'Xin lỗi bạn, tôi chưa được dạy cách chơi trò chơi này nên tôi không thể chơi với bạn được. 😦\n'+
                                        'Bạn hãy quay lại sau nhé!' })
        return;
    }

    //human player
    let tiencuocz = "";
    tiencuocz = functions.ghep_tien(tiencuoc, tiencuocz);
    functions.tao_phong(bot, message, mention, tiencuocz, f2, f3)
    const embed5 = new MessageEmbed()
    .setColor('#FBFF08')
    .setTitle('Ba lá - chơi đôi')
    .setDescription('<@' + mention.id + '> ơi.\n' +
                    '<@' + message.author.id + '> đang mời bạn cùng chơi một ván kìa.\n'+
                    'Mã phòng: `' + bot.info[message.author.id].bala.code + '`\n\n' +
                    'Vào chơi: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
                    'Thoát phòng: `' + bot.config[message.guild.id].prefix + 'bala quit`')
    .addFields(
        { name: 'Số tiền cược', value: tiencuocz + '(VND)' },
        { name: 'Tiền của ' + message.author.tag, value: tien + '(VND)' },
        { name: 'Tiền của ' + mention.tag, value: bot.info[mention.id].bala.tien + '(VND)' },
    )
    message.channel.send({ embeds: [embed5] });
}