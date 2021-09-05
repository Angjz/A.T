const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");

exports.run4 = (bot, message, args, f1, f2) => {


    switch(args[2]){
        case 'money':
            let a1 = [];
            let a2 = [];

            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a1.push(bot.info[k].bala.tien);
                a2.push(bot.info[k].id);
            }
            for(let i = 0; i < a1.length; i++) a1[i] = functions.tach_tien(a1[i], 0);

            let a = functions.sortz(a1, a2);
            a2 = a[1];
            let vitri = a2.indexOf(message.author.id);

            if (!bot.info[a2[1]]){
                ten2 = "NONE";
                tien2 = "NONE";
            }
            else{
                ten2 = bot.info[a2[1]].ten;
                tien2 = bot.info[a2[1]].bala.tien;
            }

            if (!bot.info[a2[2]]){
                ten3 = "NONE";
                tien3 = "NONE";
            }
            else{
                ten3 = bot.info[a2[2]].ten;
                tien3 = bot.info[a2[2]].bala.tien;
            }

            if (!bot.info[a2[3]]){
                ten4 = "NONE";
                tien4 = "NONE";
            }
            else{
                ten4 = bot.info[a2[3]].ten;
                tien4 = bot.info[a2[3]].bala.tien;
            }

            if (!bot.info[a2[4]]){
                ten5 = "NONE";
                tien5 = "NONE";
            }
            else{
                ten5 = bot.info[a2[4]].ten;
                tien5 = bot.info[a2[4]].bala.tien;
            }

            const embed2 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng tiền')
                .setDescription('Các đại gia:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a2[0]].ten + '\n' + bot.info[a2[0]].bala.tien + '(VND)', inline: true },
                    { name: '🥈Top 2', value: ten2 + '\n' + tien2 + '(VND)', inline: true },
                    { name: '🥉Top 3', value: ten3 + '\n' + tien3 + '(VND)', inline: true },
                    { name: 'Top 4', value: ten4 + '\n' + tien4 + '(VND)', inline: true  },
                    { name: 'Top 5', value: ten5 + '\n' + tien5 + '(VND)', inline: true  },
                    { name: 'Vị trí của ' + message.author.tag, value: 'Top ' + (vitri + 1) + '\n' + bot.info[message.author.id].bala.tien + '(VND)', inline: true  },
                )
            message.channel.send({ embeds: [embed2] });
            break;
       /* case 'play':
            let a1 = [];
            let a2 = [];
    
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a1.push(bot.info[k].bala.tien);
                a2.push(bot.info[k].id);
            }
            for(let i = 0; i < a1.length; i++) a1[i] = functions.tach_tien(a1[i], 0);
    
            let a = functions.sortz(a1, a2);
            a2 = a[1];
            let vitri = a2.indexOf(message.author.id);
    
            if (!bot.info[a2[1]]){
                ten2 = "NONE";
                tien2 = "NONE";
            }
            else{
                ten2 = bot.info[a2[1]].ten;
                tien2 = bot.info[a2[1]].bala.tien;
            }
    
            if (!bot.info[a2[2]]){
                ten3 = "NONE";
                tien3 = "NONE";
            }
            else{
                ten3 = bot.info[a2[2]].ten;
                tien3 = bot.info[a2[2]].bala.tien;
            }
    
            if (!bot.info[a2[3]]){
                ten4 = "NONE";
                tien4 = "NONE";
            }
            else{
                ten4 = bot.info[a2[3]].ten;
                tien4 = bot.info[a2[3]].bala.tien;
            }
    
            if (!bot.info[a2[4]]){
                ten5 = "NONE";
                tien5 = "NONE";
            }
            else{
                ten5 = bot.info[a2[4]].ten;
                tien5 = bot.info[a2[4]].bala.tien;
            }
    
            const embed2 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng tiền')
                .setDescription('Các đại gia:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a2[0]].ten + '\n' + bot.info[a2[0]].bala.tien + '(VND)', inline: true },
                    { name: '🥈Top 2', value: ten2 + '\n' + tien2 + '(VND)', inline: true },
                    { name: '🥉Top 3', value: ten3 + '\n' + tien3 + '(VND)', inline: true },
                    { name: 'Top 4', value: ten4 + '\n' + tien4 + '(VND)', inline: true  },
                    { name: 'Top 5', value: ten5 + '\n' + tien5 + '(VND)', inline: true  },
                    { name: 'Vị trí của ' + message.author.tag, value: 'Top ' + (vitri + 1) + '\n' + bot.info[message.author.id].bala.tien + '(VND)', inline: true  },
                )
            message.channel.send({ embeds: [embed2] });
            break;*/
        default:
            const embed1 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng')
                .setDescription('Cùng xem những người tuyệt vời nhất nào!')
                .addFields(
                    { name: 'Tiền', value: bot.config[message.guild.id].prefix + 'bala top money', inline: true },
                    { name: 'Ván chơi', value: bot.config[message.guild.id].prefix + 'bala top play', inline: true },
                    { name: 'Trận thắng', value: bot.config[message.guild.id].prefix + 'bala top win', inline: true },
                    { name: 'Ba cào', value: bot.config[message.guild.id].prefix + 'bala top bacao', inline: true },
                    { name: 'Bù', value: bot.config[message.guild.id].prefix + 'bala top bu', inline: true  },
                )
            message.channel.send({ embeds: [embed1] });
    }
}