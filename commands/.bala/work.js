const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const fs = require("fs");

/*  
    cửa hàng: 40% - 50k (6001 - 10000)
    phục vụ: 30% - 70k (3001 - 6000)
    thanh lý: 15.2% - 100k (1481 - 3000)
    giao hàng: 9.3% - 200k (551 - 1480)
    sửa máy tính: 4% - 500k (151 - 550)
    vé số: 1,44% - 1m (7 - 150)
    đặc biệt: 0.06% - 10m (1 - 6)
*/

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    
    if (tienz < 50000){
        let so = Math.floor(Math.random() * 10000) + 1;
        if (1 <= so && so <= 6){
            cv = "đã trúng giải đặc biệt và nhận được 10.000.000(VND)! 🥳🎉🎊👯";
            luong = "10.000.000";
        }
        if (7 <= so && so <= 150){
            cv = "đã trúng vé số và nhận được 1.000.000(VND)! 🥳";
            luong = "1.000.000";
        }
        if (151 <= so && so <= 550){
            cv = "đã giúp sửa máy tính và nhận được 500.000(VND)!";
            luong = "500.000";
        }
        if (551 <= so && so <= 1480){
            cv = "đã đi giao hàng và nhận được 200.000(VND).";
            luong = "200.000";
        }
        if (1481 <= so && so <= 3000){
            cv = "đã thanh lý đồ cũ và nhận được 100.000(VND).";
            luong = "100.000";
        }
        if (3001 <= so && so <= 6000){
            cv = "đã phục vụ ở nhà hàng và nhận được 70.000(VND).";
            luong = "70.000";
        }
        if (6001 <= so && so <= 10000){
            cv = "đã làm ở cửa hàng tiện lợi và nhận được 50.000(VND).";
            luong = "50.000";
        }

        tien = functions.them_tien(tien, luong, "cong");
        const embed1 = new MessageEmbed()
		    .setColor('#FBFF08') 
		    .setTitle('Ba lá - làm việc')
            .setDescription('<@' + message.author.id + '> ' + cv)
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
            .setThumbnail('https://i.imgur.com/3P0CaRM.png')
	    message.channel.send({ embeds: [embed1] });        
        
        bot.info[message.author.id] = {
            ten: bot.info[message.author.id].ten,
            id: bot.info[message.author.id].id,
            bala: {
                tien: tien,
			    choi: bot.info[message.author.id].bala.choi,
                cthang: bot.info[message.author.id].bala.cthang,
                ba_cao: bot.info[message.author.id].bala.ba_cao,
                bu: bot.info[message.author.id].bala.bu,
                phong: bot.info[message.author.id].bala.phong,
			    code: bot.info[message.author.id].bala.code,
			    start: bot.info[message.author.id].bala.start,
			    cuoc: bot.info[message.author.id].bala.cuoc,
			    o_tag: bot.info[message.author.id].bala.o_tag,
			    o_id: bot.info[message.author.id].bala.o_id,
                ngay: bot.info[message.author.id].bala.ngay,
                thang: bot.info[message.author.id].bala.thang,
                nam: bot.info[message.author.id].bala.nam,
                t_ngay: bot.info[message.author.id].bala.t_ngay,
                t_thang: bot.info[message.author.id].bala.t_thang,
                t_nam: bot.info[message.author.id].bala.t_nam,
            },
        }
        fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
            if (err) throw err;
        });
    } else{
        const embed2 = new MessageEmbed()
            .setColor('#FBFF08') 
		    .setTitle('Ba lá - làm việc')
            .setDescription('Xin lỗi <@' + message.author.id + '>, bạn có nhiều hơn 50.000(VND).\n'+
                            'Đi vui vẻ chút rồi quay lại nhé! 😄')
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
            .setThumbnail('https://i.imgur.com/3P0CaRM.png')
        message.channel.send({ embeds:[embed2] });
    }
}