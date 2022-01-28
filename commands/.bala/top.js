const { MessageEmbed } = require("discord.js");
const functions = require("../../functions/function_bala.js");
const shuff = require("../../functions/function_general.js");
exports.run = (bot, message, args, f1, f2) => {
    if (args[2]) args[2] = args[2].toLowerCase();
    switch(args[2]){
        case 'money':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;

            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.tien);
                a[a.length - 1].push(bot.info[k].id);    
            }
            for(var i = 0; i < a.length; i++) a[i][0] = functions.tach_tien(a[i][0], 0);

            a = shuff.sortz(a);
            if (output.id == bot.user.id) vitri = "25-1-5";
            else for(var i = 0; i < a.length; i++)
                    if (a[i][1] == output.id){
                        vitri = ++i;
                        break;
                    }

            var tt = [];
            for(var i = 0; i < 4; i++){
                tt.push([]);
                if (!bot.info[a[i+1][1]]) tt[i][0] = tt[i][1] = "NONE";
                else{
                    tt[i][0] = bot.info[a[i+1][1]].ten;
                    tt[i][1] = bot.info[a[i+1][1]].bala.tien;
                }
            }

            const embed2 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng tiền 💰')
                .setDescription('Các đại gia:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.tien + '(VND)', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + '(VND)', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + '(VND)', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + '(VND)', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + '(VND)', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.tien + '(VND)', inline: true  },
                )
            message.channel.send({ embeds: [embed2] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
            break;
        case 'play':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;
    
            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.choi);
                a[a.length - 1].push(bot.info[k].id);    
            }
    
            a = shuff.sortz(a);
            if (output.id == bot.user.id) vitri = "25-1-5";
            else for(var i = 0; i < a.length; i++)
                    if (a[i][1] == output.id){
                        vitri = ++i;
                        break;
                    }
    
            var tt = [];
            for(var i = 0; i < 4; i++){
                tt.push([]);
                if (!bot.info[a[i+1][1]]) tt[i][0] = tt[i][1] = "NONE";
                else{
                    tt[i][0] = bot.info[a[i+1][1]].ten;
                    tt[i][1] = bot.info[a[i+1][1]].bala.choi;
                }
            }
    
            const embed3 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng số lần chơi 🎮')
                .setDescription('Các dân chơi:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.choi + ' lần', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + ' lần', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + ' lần', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + ' lần', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + ' lần', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.choi + ' lần', inline: true  },
                )
            message.channel.send({ embeds: [embed3] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
            break;
        case 'streak':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;
        
            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.streak1);
                a[a.length - 1].push(bot.info[k].id);    
            }
        
            a = shuff.sortz(a);
            if (output.id == bot.user.id) vitri = "25-1-5";
            else for(var i = 0; i < a.length; i++)
                    if (a[i][1] == output.id){
                        vitri = ++i;
                        break;
                    }
        
            var tt = [];
            for(var i = 0; i < 4; i++){
                tt.push([]);
                if (!bot.info[a[i+1][1]]) tt[i][0] = tt[i][1] = "NONE";
                else{
                    tt[i][0] = bot.info[a[i+1][1]].ten;
                    tt[i][1] = bot.info[a[i+1][1]].bala.streak1;
                }
            }
        
            const embed4 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng chuỗi thắng 🏆')
                .setDescription('Nhà vô địch:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.streak1 + ' ván', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + ' ván', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + ' ván', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + ' ván', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + ' ván', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.streak1 + ' ván', inline: true  },
                )
            message.channel.send({ embeds: [embed4] }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            break;
        default:
            const embed1 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng')
                .setDescription('Cùng xem những người tuyệt vời nhất nào!')
                .addFields(
                    { name: 'Tiền', value: bot.config[message.guild.id].prefix + 'bala top money', inline: true },
                    { name: 'Ván chơi', value: bot.config[message.guild.id].prefix + 'bala top play', inline: true },
                    { name: 'Chuỗi thắng', value: bot.config[message.guild.id].prefix + 'bala top streak', inline: true },
                )
            message.channel.send({ embeds: [embed1] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
    }
}