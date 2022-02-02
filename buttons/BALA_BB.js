const { MessageEmbed } = require("discord.js");
const functions = require("../functions/function_bala.js");
const shuff = require("../functions/function_general.js");
const hinh = [
    'WUwBBvD', 'X3Vq43o', 'cfmx907', 'JORI4Fn', 'EzSeNuQ', 'xt8tbr6', 'ULlJfdS', 'GlDpdks', 'VTz64jw', 't9RDqEF', '8uLaaqE', 'KmxV0XI', 'nygERi7',
    'kR4QIFU', '4zOJyUv', 'n7T3YaD', 'cYwFNBh', 'zmwK8gU', 'I6C4b1N', 'aMR5bmV', 'hbHLlul', 'o93vK9j', 'TrDf6RK', '2niCLbA', 'jkHU35D', 'nLe12j3',
    '3rTG8el', 'qZowiA8', 'aFxLqln', 'hPh5Il5', 'qwaAcTi', 'T1abZv2', 'Pi1OrvA', 'aOGmOmO', '4RRb7uo', 'Hw8NXmh', 'ejW47PI', 'PXST6bl', 'Qnv1NGP',
    'fAvqomL', '2oqbtip', 'heFDjTN', 'KmpRLHn', 'uWTJLmV', 'm7vp94P', 'TkygFIY', 'xMlqW7U', 'JB7qpTv', 'n9RnriM', 'nYQiBge', 'Ecby02J', 'saJ0GdC'
]
const bo_bai = [
    "Át Bích", "2 Bích", "3 Bích", "4 Bích", "5 Bích", "6 Bích", "7 Bích", "8 Bích", "9 Bích", "10 Bích", "J Bích", "Q Bích", "K Bích",
    "Át Chuồn", "2 Chuồn", "3 Chuồn", "4 Chuồn", "5 Chuồn", "6 Chuồn", "7 Chuồn", "8 Chuồn", "9 Chuồn", "10 Chuồn", "J Chuồn", "Q Chuồn", "K Chuồn",
    "Át Rô", "2 Rô", "3 Rô", "4 Rô", "5 Rô", "6 Rô", "7 Rô", "8 Rô", "9 Rô", "10 Rô", "J Rô", "Q Rô", "K Rô",
    "Át Cơ", "2 Cơ", "3 Cơ", "4 Cơ", "5 Cơ", "6 Cơ", "7 Cơ", "8 Cơ", "9 Cơ", "10 Cơ", "J Cơ", "Q Cơ", "K Cơ"
]

exports.run = (bot, interaction, f1, f2) => {
    let one = interaction.user.id;
    if (!bot.info[one]){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
		return;
    }
    
    let code = bot.info[one].bala.code;
    if (!bot.bala_data[code]){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
		return;
    }
    
    if (!bot.bala_data[code].p[one].tag){
        interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
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
    bai = shuff.Knuth_Fisher_Yates(bai);

    let tay = bot.bala_data[code].p[one].bai;
    let diem = bot.bala_data[code].p[one].diem;
    let random = Math.floor( Math.random() * bai.length );

    const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('<@' + one + '>, bạn đã bốc đủ bài. Hãy bấm "sẵn sàng" để sẵn sàng!')
        .addFields(
            { name: 'Số điểm của bạn', value: diem + '', inline: true },
        )
    if (tay.length == 3){
        interaction.reply({ embeds: [embed1], ephemeral: true }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    }

    tay.push(bai[random]);
    diem = functions.tinh_diem(tay);
    bai.splice(random, 1);

    const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('<@' + one + '>, bạn đã bốc được lá bài: `' + bo_bai[tay[tay.length-1]] + '`!')
        .addFields(
            { name: 'Số điểm của bạn', value: diem + '', inline: true },
        )
        .setThumbnail('https://i.imgur.com/'+ hinh[tay[tay.length-1]] + '.png')
    interaction.reply({ embeds: [embed2], ephemeral: true }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
        
    bot.bala_data[code].bai = bai;
    bot.bala_data[code].p[one].diem = diem;
    bot.bala_data[code].p[one].bai = tay;
    functions.viet_file(bot);
}