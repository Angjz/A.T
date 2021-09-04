const { MessageEmbed } = require("discord.js");
const functions = require("../functions.js");

exports.run3 = (bot, interaction, f1, f2) => {
    let one = interaction.user.id;
    if (!bot.info[one]){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
    }
    
    let code = bot.info[one].bala.code;
    if (!bot.bala_data[code]){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
    }
    
    if (one != bot.bala_data[code].p1.id && one != bot.bala_data[code].p2.id){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
    }

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Phòng: `' + code + '`\n'+
                        '<@' + one + '> đã sẵn sàng!')
    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('<@' + one + '>, bạn đã sẵn sàng rồi!')

    if (one == bot.bala_data[code].p1.id){
        let xong = bot.bala_data[code].p1.xong;
        if (xong == 0){
            interaction.channel.send({ embeds: [embed1] });
            xong = 1;
        } else{
            interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
        }

        let bai = bot.bala_data[code].bai;
        bai = functions.fisherYates(bai);
        let tay = bot.bala_data[code].p1.bai;
        let diem = bot.bala_data[code].p1.diem;

        for (i = tay.length; i < 3; i++){
            let random = Math.floor( Math.random() * bai.length );
            tay[i] = bai[random];
            bai.splice(random, 1);
        }  
        diem = functions.tinh_diem(tay);
       
        bot.bala_data[code] = {
            cuoc: bot.bala_data[code].cuoc,
            bai: bai,
            p1:{
                id: bot.bala_data[code].p1.id,
                uname: bot.bala_data[code].p1.uname,
                dis: bot.bala_data[code].p1.dis,
                diem: diem,
                bai: tay,
                xong: xong
            },
            p2:{
                id: bot.bala_data[code].p2.id,
                uname: bot.bala_data[code].p2.uname,
                dis: bot.bala_data[code].p2.dis,
                diem: bot.bala_data[code].p2.diem,
                bai: bot.bala_data[code].p2.bai,
                xong: bot.bala_data[code].p2.xong
            }
        }
        functions.viet_file(bot);
    } else{
        let xong = bot.bala_data[code].p2.xong;
        if (xong == 0){
            interaction.channel.send({ embeds: [embed1] });
            xong = 1;
        } else{
            interaction.reply({ embeds: [embed2], ephemeral: true });
            return;
        }

        let bai = bot.bala_data[code].bai;
        bai = functions.fisherYates(bai);
        let tay = bot.bala_data[code].p2.bai;
        let diem = bot.bala_data[code].p2.diem;

        for (i = tay.length; i < 3; i++){
            let random = Math.floor( Math.random() * bai.length );
            tay[i] = bai[random];
            bai.splice(random, 1);
        }  
        diem = functions.tinh_diem(tay);
       
        bot.bala_data[code] = {
            cuoc: bot.bala_data[code].cuoc,
            bai: bai,
            p1:{
                id: bot.bala_data[code].p1.id,
                uname: bot.bala_data[code].p1.uname,
                dis: bot.bala_data[code].p1.dis,
                diem: bot.bala_data[code].p1.diem,
                bai: bot.bala_data[code].p1.bai,
                xong: bot.bala_data[code].p1.xong
            },
            p2:{
                id: bot.bala_data[code].p2.id,
                uname: bot.bala_data[code].p2.uname,
                dis: bot.bala_data[code].p2.dis,
                diem: diem,
                bai: tay,
                xong: xong
            }
        }
        functions.viet_file(bot);
    }

    if (bot.bala_data[code].p1.xong == 1 && bot.bala_data[code].p2.xong == 1) functions.ba_la_het(bot, interaction, code);
}