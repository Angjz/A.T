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
    
    if (!bot.bala_data[code].p[one].tag){
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

    let xong = bot.bala_data[code].p[one].xong;
    if (xong == 0){
        interaction.channel.send({ embeds: [embed1] });
        xong = 1;
    } else{
        interaction.reply({ embeds: [embed2], ephemeral: true });
        return;
    }

    let bai = bot.bala_data[code].bai;
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