const { MessageEmbed } = require("discord.js");
const functions = require("../../functions/function_bala.js");
const fs = require("fs");
const f3 = "../data/bala.json";

exports.run = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Hãy đưa ra số tiền cược lớn hơn 1.000(VND) và mời mọi người nào!')
        .addFields(
            { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'bala bet <tiền cược>', inline: true },
            { name: 'Ví dụ 1', value: bot.config[message.guild.id].prefix + 'bala bet 10.000', inline: true },
            { name: 'Ví dụ 2', value: bot.config[message.guild.id].prefix + 'bala bet 10000', inline: true },
            { name: 'Ví dụ 3', value: bot.config[message.guild.id].prefix + 'bala bet quarter', inline: true },
            { name: 'Ví dụ 4', value: bot.config[message.guild.id].prefix + 'bala bet half', inline: true },
            { name: 'Ví dụ 5', value: bot.config[message.guild.id].prefix + 'bala bet all', inline: true },
            { name: 'Ví dụ 6', value: bot.config[message.guild.id].prefix + 'bala bet 10k', inline: true },
            { name: 'Ví dụ 7', value: bot.config[message.guild.id].prefix + 'bala bet 10m', inline: true },
            { name: 'Ví dụ 8', value: bot.config[message.guild.id].prefix + 'bala bet 10b', inline: true },
            { name: 'Số tiền của bạn ' + message.author.tag, value: tien + '(VND)' },
        )
        const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không thể cược ít hơn 1.000(VND).\n'+
                        'Xin hãy cược nhiều hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )
        const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không có đủ tiền.\n'+
                        'Xin hãy cược ít hơn. 😦')
        .addFields(
            { name: 'Số tiền của bạn', value: tien + '(VND)' },
        )
        const embed4 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi nhiều người')
            .setDescription('Xin lỗi <@' + message.author.id + '>, bạn hiện không ở trong bàn cược nào nên không thể thoát được.')
        const embed5 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi nhiều người')
            .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn hiện đang trong một ván đấu rồi.\n'+
                            'Bạn hãy kết thúc ván đấu nhé!')
        const embed6 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi nhiều người')
            .setDescription('Xin lỗi <@' + message.author.id + '>, nhưng bạn không phải là chủ bàn cược `'+ bot.info[message.author.id].bala.code + '`.')
    
        //error handlers
        if (!args[2]){
            message.channel.send({ embeds: [embed1] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            return;
        }
        if (bot.info[message.author.id].bala.phong == 0){
            message.channel.send({ embeds: [embed4] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            return;
        }
        if (bot.info[message.author.id].bala.start == 1){
            message.channel.send({ embeds: [embed5] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            return;
        }
        if (bot.info[message.author.id].bala.phong == 2 && bot.info[message.author.id].bala.chu == 0){
            message.channel.send({ embeds: [embed6] }).catch(error => {
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
            message.channel.send({ embeds: [embed2] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
            }})
        return;
        }
        if (tienz < tiencuoc){
            message.channel.send({ embeds: [embed3] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
            }})
        return; 
        }
        

        //start
        let tiencuocz = "";
        tiencuocz = functions.ghep_tien(tiencuoc, tiencuocz);
        let code = bot.info[message.author.id].bala.code;
        bot.bala_data[code].cuoc = tiencuocz;
        fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
            if (err) throw err;
        });

        //thông báo
	    let count = 0;
	    let idz = [];
	    for(var k in bot.bala_data[code].p){
		    if (!bot.bala_data[code].p[k].tag) continue;
		    count++;
		    idz.push(bot.bala_data[code].p[k].id);
	    }

	    let list = "";
	    for (var i = 0; i < idz.length; i++) list += '<@' + idz[i] + '>, ';
	    list = list.slice(0, list.length - 2);
	    const embed = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi nhiều người')
            .setDescription('Ván chơi của <@' + message.author.id + '>\n'+
						    'Bàn cược: `' + code + '`\n'+
						    'Số lượng người chơi: ' + count + '\n\n' +
						    'Tham gia: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
                            'Đổi tiền cược: `' + bot.config[message.guild.id].prefix + 'bala bet`\n'+
						    'Bắt đầu: `' + bot.config[message.guild.id].prefix + 'bala start`\n'+
						    'Thoát bàn: `' + bot.config[message.guild.id].prefix + 'bala quit`')
            .addFields(
			    { name: 'Tiền cược', value: tiencuocz + '(VND)' },
			    { name: 'Danh sách người chơi', value: list + '' },
       	    )
	    message.channel.send({ embeds: [embed] }).catch(error => {
		    if (error.code !== 50013) {
			    console.error('Lỗi nữaaaaa:', error);
		    }})
}