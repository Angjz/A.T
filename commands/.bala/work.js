const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const fs = require("fs");
/*  
    cửa hàng: 48,4% - 50k
    phục vụ: 19,4% - 70k
    giao hàng: 12,9% - 120k
    thanh lý: 9,6% - 100k
    sửa máy tính: 6,5% - 200k
    vé số: 3,2% - 1m
*/
const cv = [
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã thanh lý đồ cũ và nhận được 100.000(VND)",
    "đã thanh lý đồ cũ và nhận được 100.000(VND)",
    "đã thanh lý đồ cũ và nhận được 100.000(VND)",
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã giúp sửa máy tính và nhận được 200.000(VND)",
    "đã giúp sửa máy tính và nhận được 200.000(VND)",
    "đã làm phục vụ ở nhà hàng và nhận được 70.000(VND)",
    "đã trúng vé số và nhận được 1.000.000(VND)!",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã đi giao hàng và nhận được 120.000(VND)",
    "đã đi giao hàng và nhận được 120.000(VND)",
    "đã đi giao hàng và nhận được 120.000(VND)",
    "đã đi giao hàng và nhận được 120.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)",
    "đã làm việc ở cửa hàng tiện lợi và nhận được 50.000(VND)"
]
const luong = [
    "70.000",
    "70.000",
    "70.000",
    "100.000",
    "100.000",
    "100.000",
    "70.000",
    "70.000",
    "200.000",
    "200.000",
    "70.000",
    "1.000.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "120.000",
    "120.000",
    "120.000",
    "120.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000",
    "50.000"
]

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    
    if (tienz < 50000){
        let so = Math.floor(Math.random() * cv.length);
        tien = functions.them_tien(tien, luong[so], "cong");
        const embed1 = new MessageEmbed()
		    .setColor('#FBFF08') 
		    .setTitle('Ba lá - làm việc')
            .setDescription('<@' + message.author.id + '> ' + cv[so])
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
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
            .setDescription('Xin lỗi <@' + message.author.id + '>, bạn có nhiều hơn 50.000(VND). Đi vui vẻ chút rồi quay lại nhé! 😄')
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
        message.channel.send({ embeds:[embed2] });
    }
}