const { MessageEmbed } = require("discord.js");
const functions = require("./functions/function_bala.js");
const f3 = "./data/bala.json";

exports.run = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);

    //embeds
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Hãy đưa ra số tiền cược lớn hơn 1.000(VND) và cùng chơi với tôi nào! 😄')
        .addFields(
            { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'bala play <tiền cược>', inline: true },
            { name: 'Ví dụ 1', value: bot.config[message.guild.id].prefix + 'bala play 10.000', inline: true },
            { name: 'Ví dụ 2', value: bot.config[message.guild.id].prefix + 'bala play 10000', inline: true },
            { name: 'Ví dụ 3', value: bot.config[message.guild.id].prefix + 'bala play quarter', inline: true },
            { name: 'Ví dụ 4', value: bot.config[message.guild.id].prefix + 'bala play half', inline: true },
            { name: 'Ví dụ 5', value: bot.config[message.guild.id].prefix + 'bala play all', inline: true },
            { name: 'Ví dụ 6', value: bot.config[message.guild.id].prefix + 'bala play 10k', inline: true },
            { name: 'Ví dụ 7', value: bot.config[message.guild.id].prefix + 'bala play 10m', inline: true },
            { name: 'Ví dụ 8', value: bot.config[message.guild.id].prefix + 'bala play 10b', inline: true },
            { name: 'Số tiền của bạn ' + message.author.tag, value: tien + '(VND)' },
        )
    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                        'Bạn hãy kết thúc ván đấu rồi hẳn chơi với tôi nhé! 😄')
    const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong bàn cược: `' + bot.info[message.author.id].bala.code + '`\n'+
                        'với số tiền cược là: `' + bot.info[message.author.id].bala.cuoc + '(VND)`\n\n'+
                        'Bạn hãy dùng: `' + bot.config[message.guild.id].prefix + 'bala quit` để thoát bàn cược đã rồi mới chơi với tôi nhé! 😄')
    const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể cược ít hơn 1.000(VND).\n'+
                        'Xin hãy cược nhiều hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )
    const embed5 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không có đủ tiền.\n'+
                        'Xin hãy cược ít hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )
    const embed6 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Được rồi bạn <@' + message.author.id + '>, hãy cùng chơi nào! 😄')

    //error handlers
    if (!args[2]){
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
    if (bot.info[message.author.id].bala.phong == 2){
        message.channel.send({ embeds: [embed3] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    
    //check cuocz
    let tiencuoc = 0;
    if (args[2] === "all") tiencuoc = tienz;
    else if (args[2] === "half") tiencuoc = (tienz/2).toFixed();
        else if (args[2] === "quarter") tiencuoc = (tienz/4).toFixed();
            else tiencuoc = functions.tach_tien(args[2], tiencuoc);
    if (tiencuoc < 1000){
        message.channel.send({ embeds: [embed4] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }
    if (tienz < tiencuoc){
        message.channel.send({ embeds: [embed5] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return; 
    }

    //start
    let tiencuocz = "";
    tiencuocz = functions.ghep_tien(tiencuoc, tiencuocz);
    message.channel.send({ embeds: [embed6] }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
    functions.tao_phong1(bot, message, tiencuocz, f2, f3);
}