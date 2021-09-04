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

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Hãy chọn một trong các bàn cược sau và rủ một ai đó cùng chơi nào!\n'+
                        'Bạn cũng có thể chơi với tôi nếu không có ai chơi cùng bạn. 😉')
        .addFields(
            { name: 'Bàn số 1', value: '10.000(VND)', inline: true },    
            { name: 'Bàn số 2', value: '20.000(VND)', inline: true },    
            { name: 'Bàn số 3', value: '50.000(VND)', inline: true },    
            { name: 'Bàn số 4', value: '100.000(VND)', inline: true },    
            { name: 'Bàn số 5', value: '200.000(VND)', inline: true },    
            { name: 'Bàn số 6', value: '500.000(VND)', inline: true },    
            { name: 'Bàn số 7', value: '1.000.000(VND)', inline: true },    
            { name: 'Bàn số 8', value: '2.000.000(VND)', inline: true },    
            { name: 'Bàn số 9', value: '5.000.000(VND)', inline: true },    
            { name: 'Bàn số 10', value: '10.000.000(VND)', inline: true },    
            { name: 'Bàn số 11', value: '20.000.000(VND)', inline: true },    
            { name: 'Bàn số 12', value: '50.000.000(VND)', inline: true },    
            { name: '\u200B', value: '\u200B' },
            { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'bala play <bàn cược> @<ai đó>', inline: true },
            { name: 'Ví dụ', value: bot.config[message.guild.id].prefix + 'bala play 2 @Ang', inline: true },
            { name: 'Số tiền hiện tại của bạn ' + message.author.username + '#' + message.author.discriminator, value: tien + '(VND)' },
        )
    //typo error handler
    if (!args[2] || !mention || !mention.id){
        message.channel.send({ embeds: [embed1] });
        return;
    }

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không đủ tiền cho bàn chơi này. Xin hãy chọn bàn chơi thấp hơn. 😦')
        .addFields(
            { name: 'Số tiền hiện tại của bạn ', value: tien + '(VND)' },
        )
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể chơi với chính mình được. 😄')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn <@' + mention.id + '> hiện đang bận rồi. Hãy đợi bạn ấy xong đã nhé. 😦')
    const embed6 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược số `' + bot.info[message.author.id].bala.cuoc + '`\n'+
                        'và đang đợi bạn `' + bot.info[message.author.id].bala.o_name + '#' + bot.info[message.author.id].bala.o_dis + '` rồi.\n\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.username + '#' + message.author.discriminator + '`\n'+
                        'Hoặc dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát phòng nhé!')
    const embed7 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi. Bạn hãy kết thúc ván đấu rồi hẳn bắt đầu ván mới nhé! 😄')
    const embed8 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn <@' + mention.id + '> chưa có tiền. 😦\n'+
                        'Bạn hãy bảo bạn ấy dùng: `' + bot.config[message.guild.id].prefix + 'bala work` sau đó là `' + bot.config[message.guild.id].prefix + 'bala daily` nhé!')

    //error handler
    if (isNaN(Number(args[2])) || Number(args[2]) > 12 || Number(args[2]) < 1){
        message.channel.send({ embeds: [embed1] });
        return;  
    }
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
    if (tienz < tiencuoc[args[2]-1]){
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
    functions.tao_phong(bot, message, mention, args[2], tiencuoc2[args[2]-1], f2, f3)
    const embed5 = new MessageEmbed()
    .setColor('#FBFF08')
    .setTitle('Ba lá - chơi')
    .setDescription('<@' + mention.id + '> ơi.\n' +
                    '<@' + message.author.id + '> đang mời bạn cùng chơi một ván kìa.\n'+
                    'Mã phòng: `' + bot.info[message.author.id].bala.code + '`\n\n' +
                    'Vào chơi: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.username + '#' + message.author.discriminator + '`\n'+
                    'Thoát phòng: `' + bot.config[message.guild.id].prefix + 'bala quit`')
    .addFields(
        { name: 'Số tiền cược', value: tiencuoc2[args[2]-1] + '(VND)' },
        { name: 'Tiền của ' + message.author.username + '#' + message.author.discriminator, value: tien + '(VND)' },
        { name: 'Tiền của ' + mention.username + '#' + mention.discriminator, value: bot.info[mention.id].bala.tien + '(VND)' },
    )
    message.channel.send({ embeds: [embed5] });
}