const { MessageEmbed } = require("discord.js");
const functions = require("../functions.js");
const hinh = [
    'WUwBBvD', 'X3Vq43o', 'cfmx907', 'JORI4Fn', 'EzSeNuQ', 'xt8tbr6', 'ULlJfdS', 'GlDpdks', 'VTz64jw', 't9RDqEF', '8uLaaqE', 'KmxV0XI', 'nygERi7',
    'kR4QIFU', '4zOJyUv', 'n7T3YaD', 'cYwFNBh', 'zmwK8gU', 'I6C4b1N', 'aMR5bmV', 'hbHLlul', 'o93vK9j', 'TrDf6RK', '2niCLbA', 'jkHU35D', 'nLe12j3',
    '3rTG8el', 'qZowiA8', 'aFxLqln', 'hPh5Il5', 'qwaAcTi', 'T1abZv2', 'Pi1OrvA', 'aOGmOmO', '4RRb7uo', 'Hw8NXmh', 'ejW47PI', 'PXST6bl', 'Qnv1NGP',
    'fAvqomL', '2oqbtip', 'heFDjTN', 'KmpRLHn', 'uWTJLmV', 'm7vp94P', 'TkygFIY', 'xMlqW7U', 'JB7qpTv', 'n9RnriM', 'nYQiBge', 'Ecby02J', 'saJ0GdC'
]
const bo_bai = [
    "Át Bích", "2 Bích", "3 Bích", "4 Bích", "5 Bích", "6 Bích", "7 Bích", "8 Bích", "9 Bích", "10 Bích", "Bồi J Bích", "Đầm Q Bích", "Già K Bích",
    "Át Chuồn", "2 Chuồn", "3 Chuồn", "4 Chuồn", "5 Chuồn", "6 Chuồn", "7 Chuồn", "8 Chuồn", "9 Chuồn", "10 Chuồn", "Bồi J Chuồn", "Đầm Q Chuồn", "Già K Chuồn",
    "Át Rô", "2 Rô", "3 Rô", "4 Rô", "5 Rô", "6 Rô", "7 Rô", "8 Rô", "9 Rô", "10 Rô", "Bồi J Rô", "Đầm Q Rô", "Già K Rô",
    "Át Cơ", "2 Cơ", "3 Cơ", "4 Cơ", "5 Cơ", "6 Cơ", "7 Cơ", "8 Cơ", "9 Cơ", "10 Cơ", "Bồi J Cơ", "Đầm Q Cơ", "Già K Cơ"
]

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
    
    let bai = bot.bala_data[code].bai;
    bai = functions.Knuth_Fisher_Yates(bai);

    if (one == bot.bala_data[code].p1.id){
        let tay = bot.bala_data[code].p1.bai;
        let diem = bot.bala_data[code].p1.diem;
        let random = Math.floor( Math.random() * bai.length );

        const embed1 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi đôi')
            .setDescription('<@' + one + '>, bạn đã bốc đủ bài. Hãy bấm "sẵn sàng" để đối chiếu số điểm!')
            .addFields(
                { name: 'Số điểm của bạn', value: diem + ".", inline: true },
            )
        if (tay.length == 3){
            interaction.reply({ embeds: [embed1], ephemeral: true });
            return;
        }

        tay.push(bai[random]);
        diem = functions.tinh_diem(tay);
        bai.splice(random, 1);

        const embed2 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi đôi')
            .setDescription('<@' + one + '>, bạn đã bốc được lá bài: `' + bo_bai[tay[tay.length-1]] + '`!')
            .addFields(
                { name: 'Số điểm của bạn', value: diem + ".", inline: true },
            )
            .setThumbnail('https://i.imgur.com/'+ hinh[tay[tay.length-1]] + '.png')
        interaction.reply({ embeds: [embed2], ephemeral: true });
        
        bot.bala_data[code].bai = bai;
        bot.bala_data[code].p1.diem = diem;
        bot.bala_data[code].p1.bai = tay;
        functions.viet_file(bot);
    } else{
        let tay = bot.bala_data[code].p2.bai;
        let diem = bot.bala_data[code].p2.diem;
        let random = Math.floor( Math.random() * bai.length );

        const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi đôi')
        .setDescription('<@' + one + '>, bạn đã bốc đủ bài. Hãy bấm "sẵn sàng" để đối chiếu số điểm!')
        .addFields(
            { name: 'Số điểm của bạn', value: diem + ".", inline: true },
        )
        if (tay.length == 3){
            interaction.reply({ embeds: [embed3], ephemeral: true });
            return;
        }

        tay.push(bai[random]);
        diem = functions.tinh_diem(tay);
        bai.splice(random, 1);

        const embed4 = new MessageEmbed()
            .setColor('#FBFF08')
            .setTitle('Ba lá - chơi đôi')
            .setDescription('<@' + one + '>, bạn đã bốc được lá bài: `' + bo_bai[tay[tay.length-1]] + '`!')
            .addFields(
                { name: 'Số điểm của bạn', value: diem + ".", inline: true },
            )
            .setThumbnail('https://i.imgur.com/'+ hinh[tay[tay.length-1]] + '.png')
        interaction.reply({ embeds: [embed4], ephemeral: true });

        bot.bala_data[code].bai = bai;
        bot.bala_data[code].p2.diem = diem;
        bot.bala_data[code].p2.bai = tay;
        functions.viet_file(bot);
    }
}