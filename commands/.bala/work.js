const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");
const fs = require("fs");

exports.run4 = (bot, message, args, f1, f2) => {
    let tien = bot.info[message.author.id].bala.tien;
    let tienz = functions.tach_tien(tien, 0);
    
    if (tienz < 50000){
        let so = Math.floor(Math.random() * 10000) + 1;
        if (1 <= so && so <= 6){
            cv = "đã trúng giải đặc biệt và nhận được 10.000.000(VND)! 🥳🎉🎊👯";
            luong = "10.000.000";
        }
        if (7 <= so && so <= 106){
            cv = "đã trúng vé số và nhận được 1.000.000(VND)! 🥳";
            luong = "1.000.000";
        }
        if (107 <= so && so <= 550){
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
            .setThumbnail('https://i.imgur.com/uu36wha.png')
	    message.channel.send({ embeds: [embed1] });        
        
        bot.info[message.author.id].bala.tien = tien;
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
            .setThumbnail('https://i.imgur.com/uu36wha.png')
        message.channel.send({ embeds:[embed2] });
    }
}