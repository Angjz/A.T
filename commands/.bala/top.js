const { MessageEmbed } = require("discord.js");
const functions = require("../../functions.js");

exports.run4 = (bot, message, args, f1, f2) => {
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

            a = functions.sortz(a);
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
            message.channel.send({ embeds: [embed2] });
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
    
            a = functions.sortz(a);
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
            message.channel.send({ embeds: [embed3] });
            break;
        case 'win':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;
        
            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.cthang);
                a[a.length - 1].push(bot.info[k].id);    
            }
        
            a = functions.sortz(a);
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
                    tt[i][1] = bot.info[a[i+1][1]].bala.cthang;
                }
            }
        
            const embed4 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng số trận thắng 🥳')
                .setDescription('Hay không bằng hên:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.cthang + ' thắng', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + ' thắng', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + ' thắng', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + ' thắng', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + ' thắng', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.cthang + ' thắng', inline: true  },
                )
            message.channel.send({ embeds: [embed4] });
            break;
        case 'bacao':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;
            
            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.ba_cao);
                a[a.length - 1].push(bot.info[k].id);    
            }
            
            a = functions.sortz(a);
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
                    tt[i][1] = bot.info[a[i+1][1]].bala.ba_cao;
                }
            }
            
            const embed5 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng số lần được ba cào 🍀')
                .setDescription('Vua/Nữ hoàng trò chơi:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.ba_cao + ' ba cào', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + ' ba cào', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + ' ba cào', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + ' ba cào', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + ' ba cào', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.ba_cao + ' ba cào', inline: true  },
                )
            message.channel.send({ embeds: [embed5] });
            break;
        case 'bu':
            var mention = message.mentions.users.first();
            if (!mention) var output = message.author;
            else var output = mention;
                
            var a = [];
            for(var k in bot.info) {
                if (k == "880842350459486258") continue;
                a.push([]);
                a[a.length - 1].push(bot.info[k].bala.bu);
                a[a.length - 1].push(bot.info[k].id);    
            }
                
            a = functions.sortz(a);
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
                    tt[i][1] = bot.info[a[i+1][1]].bala.bu;
                }
            }
                
            const embed6 = new MessageEmbed()
                .setColor('#FBFF08')
                .setTitle('Ba lá - bảng xếp hạng số lần bị bù 😭')
                .setDescription('Đen bạc đỏ tình:')
                .addFields(
                    { name: '🥇Top 1', value: bot.info[a[0][1]].ten + '\n' + bot.info[a[0][1]].bala.bu + ' bù', inline: true },
                    { name: '🥈Top 2', value: tt[0][0] + '\n' + tt[0][1] + ' bù', inline: true },
                    { name: '🥉Top 3', value: tt[1][0] + '\n' + tt[1][1] + ' bù', inline: true },
                    { name: 'Top 4', value: tt[2][0] + '\n' + tt[2][1] + ' bù', inline: true  },
                    { name: 'Top 5', value: tt[3][0] + '\n' + tt[3][1] + ' bù', inline: true  },
                    { name: 'Vị trí của ' + output.tag, value: 'Top ' + vitri + '\n' + bot.info[output.id].bala.bu + ' bù', inline: true  },
                )
            message.channel.send({ embeds: [embed6] });
            break;
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
                    { name: '\u200b ', value: '\u200b', inline: true },
                    { name: 'Bù', value: bot.config[message.guild.id].prefix + 'bala top bu', inline: true  },
                )
            message.channel.send({ embeds: [embed1] });
    }
}