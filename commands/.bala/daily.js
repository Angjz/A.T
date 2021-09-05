const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const fs = require("fs");

exports.run4 = (bot, message, args, f1, f2) => {
    let ts = Date.now();
	let date_ob = new Date(ts);
	let date = date_ob.getDate();
	let month = date_ob.getMonth() + 1;
	let year = date_ob.getFullYear();

    let ngay = bot.info[message.author.id].bala.ngay;
    let thang = bot.info[message.author.id].bala.thang;
    let nam = bot.info[message.author.id].bala.nam;

    let t_ngay = bot.info[message.author.id].bala.t_ngay;
    let t_thang = bot.info[message.author.id].bala.t_thang;
    let t_nam = bot.info[message.author.id].bala.t_nam;

    let tien = bot.info[message.author.id].bala.tien;

    if (year > nam){
        nam = year;
        thang = month;
        ngay = date;
        if (t_nam == 1) t_nam = 0;
        if (t_thang == 1) t_thang = 0;
        if (t_ngay == 1) t_ngay = 0;
    }
    if (month > thang || (month == 1 && thang == 12)){
        thang = month;
        ngay = date;
        if (t_thang == 1) t_thang = 0;
        if (t_ngay == 1) t_ngay = 0;
    }
    if (date > ngay){
        ngay = date;
        if (t_ngay == 1) t_ngay = 0;
    }

    if (t_nam == 0){
        tien = functions.them_tien(tien, "1.000.000", "cong");
        t_nam = 1;
        const embed1 = new MessageEmbed()
		    .setColor('#FBFF08') 
		    .setTitle('Ba lá - thưởng năm')
            .setDescription('Chúc mừng năm mới <@' + message.author.id + '>! 🥳\n'+
                            'Xin gửi bạn 1.000.000(VND) thưởng năm cùng lời chúc sức khỏe và hạnh phúc nhé! 😄')
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
	    message.channel.send({ embeds: [embed1] });
    }
    if (t_thang == 0){
        tien = functions.them_tien(tien, "500.000", "cong");
        t_thang = 1;
        const embed2 = new MessageEmbed()
		    .setColor('#FBFF08') 
		    .setTitle('Ba lá - thưởng tháng')
            .setDescription('Chúc mừng <@' + message.author.id + '>, bạn đã nhận được thêm 500.000(VND) thưởng tháng!')
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
	    message.channel.send({ embeds: [embed2] });
    }
    if (t_ngay == 0){
        tien = functions.them_tien(tien, "100.000", "cong");
        t_ngay = 1;
        const embed3 = new MessageEmbed()
		    .setColor('#FBFF08') 
		    .setTitle('Ba lá - thưởng ngày')
            .setDescription('Chúc mừng <@' + message.author.id + '>, bạn đã nhận được 100.000(VND) thưởng ngày!')
            .addFields(
                { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
            )
	    message.channel.send({ embeds: [embed3] });        
        
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
                ngay: ngay,
                thang: thang,
                nam: nam,
                t_ngay: t_ngay,
                t_thang: t_thang,
                t_nam: t_nam,
            },
        }
        fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
            if (err) throw err;
        });
    } else{
        const embed4 = new MessageEmbed()
		.setColor('#FBFF08') 
		.setTitle('Ba lá - thưởng ngày')
        .setDescription('Xin lỗi <@' + message.author.id + '>, bạn đã nhận thưởng ngày rồi.\n'+
                        'Hãy quay lại vào 0:00(UTC+7) hôm sau nhé. 😦')
        .addFields(
            { name: 'Số tiền hiện tại của bạn', value: tien + '(VND)' },
        )
	    message.channel.send({ embeds: [embed4] });
    }
    
}