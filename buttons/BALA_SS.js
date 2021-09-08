const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const functions = require("../functions.js");

exports.run3 = async (bot, interaction, f1, f2) => {
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
    
    if (!bot.bala_data[code].p[one].tag){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
    }

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('<@' + one + '>, bạn đã sẵn sàng rồi!')
    let xong = bot.bala_data[code].p[one].xong;
    if (xong == 0){
        var msg = bot.bala_data[code].msg;
        var msg_m = await interaction.channel.messages.fetch(msg).catch(error => {
            if (error.code !== 10008) {
                console.error('Lỗi nữaaaaa:', error);
            }
        });
        var sansang = bot.bala_data[code].sansang;
        sansang.push(' ' + bot.bala_data[code].p[one].tag);

        let chu = bot.bala_data[code].chu;
        let cuoc = bot.bala_data[code].cuoc;

        let danhsach = [];
        for(var k in bot.bala_data[code].p){
            if (!bot.bala_data[code].p[k].tag) continue;
            danhsach.push(' ' + bot.bala_data[code].p[k].tag);
        }
        bot.bala_data[code].danhsach = danhsach;
        fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
            if (err) throw err;
        });

        const embed2 = new MessageEmbed()
		    .setColor('#FBFF08')
		    .setTitle('Ba lá - chơi nhiều người')
            .setDescription('Ván chơi của <@' + chu + '>\n'+
						    'Bàn cược: `' + code + '`\n'+
						    'Số lượng người chơi: ' + danhsach.length + '\n'+
						    'Những người chơi có mặt có 60 giây để bốc đủ ba lá bài\n'+
                            'hoặc bấm "sẵn sàng" để hệ thống tự động bốc.')
            .addFields(
			    { name: 'Mức cược', value: cuoc + '(VND)' },
			    { name: 'Danh sách người chơi', value: danhsach + '.' },
                { name: 'Đã sẵn sàng', value: sansang + '.' },
            )
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("BALA_BB")
                .setLabel("BỐC BÀI")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("BALA_SS")
                .setLabel("SẴN SÀNG")
                .setStyle("SUCCESS")
        );
        msg_m.edit({ embeds: [embed2], components: [row] }).catch(error => {
            if (error.code !== 10008) {
                console.error('Lỗi nữaaaaa:', error);
            }
        });
        xong = 1;
    } else{
        interaction.reply({ embeds: [embed1], ephemeral: true });
        return;
    }

    let bai = bot.bala_data[code].bai;
    if (bai.length == 1){
        bai2 = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28,
            29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
            49, 50, 51
        ];
        bai2.push(bai[0]);
        bai = bai2;
    }
    bai = functions.Knuth_Fisher_Yates(bai);
    
    let tay = bot.bala_data[code].p[one].bai;
    let diem = bot.bala_data[code].p[one].diem;

    for (i = tay.length; i < 3; i++){
        let random = Math.floor( Math.random() * bai.length );
        tay[i] = bai[random];
        bai.splice(random, 1);
    }  
    diem = functions.tinh_diem(tay);
       
    bot.bala_data[code].bai = bai;
    bot.bala_data[code].p[one].diem = diem;
    bot.bala_data[code].p[one].bai = tay;
    bot.bala_data[code].p[one].xong = xong;
    functions.viet_file(bot);

    for(var k in bot.bala_data[code].p)
        if (bot.bala_data[code].p[k].xong == 0)
            return;
    functions.ba_la_het(bot, interaction, code);
}