const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const f3 = "./data/bala.json";

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);

    //embeds
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Hãy đưa ra số tiền cược lớn hơn 1.000(VND) và mời mọi người nào!')
        .addFields(
            { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'bala create <tiền cược>', inline: true },
            { name: 'Ví dụ 1', value: bot.config[message.guild.id].prefix + 'bala create 10.000', inline: true },
            { name: 'Ví dụ 2', value: bot.config[message.guild.id].prefix + 'bala create 10000', inline: true },
            { name: 'Ví dụ 3', value: bot.config[message.guild.id].prefix + 'bala create quarter', inline: true },
            { name: 'Ví dụ 4', value: bot.config[message.guild.id].prefix + 'bala create half', inline: true },
            { name: 'Ví dụ 5', value: bot.config[message.guild.id].prefix + 'bala create all', inline: true },
            { name: 'Ví dụ 6', value: bot.config[message.guild.id].prefix + 'bala create 10k', inline: true },
            { name: 'Ví dụ 7', value: bot.config[message.guild.id].prefix + 'bala create 10m', inline: true },
            { name: 'Ví dụ 8', value: bot.config[message.guild.id].prefix + 'bala create 10b', inline: true },
            { name: 'Số tiền của bạn ' + message.author.tag, value: tien + '(VND)' },
        )
    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn chơi với tôi nhé! 😄')
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.code + '`\n'+
                        'với số tiền cược là: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n\n'+
                        'Bạn hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát bàn cược đã rồi mới tạo bàn cược mới nhé!'+
                        'Hoặc mời người khác vào bằng: `' + bot.config[message.guild.id].prefix + 'bala join ' + message.author.tag + '`')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể cược ít hơn 1.000(VND).\n'+
                        'Xin hãy cược nhiều hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )
    const embed5 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không đủ tiền.\n'+
                        'Xin hãy cược ít hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )

    //error handlers
    if (!args[2]){
        message.channel.send({ embeds: [embed1] });
        return;
    }
    if (bot.info[message.author.id].bala.start == 1){
        message.channel.send({ embeds: [embed2] });
        return;
    }
    if (bot.info[message.author.id].bala.phong == 2){
        message.channel.send({ embeds: [embed3] });
        return;
    }
    
    //check cuocz
    let tiencuoc = 0;
    if (args[2] === "all") tiencuoc = tienz;
    else if (args[2] === "half") tiencuoc = (tienz/2).toFixed();
        else if (args[2] === "quarter") tiencuoc = (tienz/4).toFixed();
            else tiencuoc = functions.tach_tien(args[2], tiencuoc);
    if (tiencuoc < 1000){
        message.channel.send({ embeds: [embed4] });
        return;
    }
    if (tienz < tiencuoc){
        message.channel.send({ embeds: [embed5] });
        return; 
    }

    //start
    let tiencuocz = "";
    tiencuocz = functions.ghep_tien(tiencuoc, tiencuocz);
    functions.tao_phong2(bot, message, tiencuocz, f2, f3);
}