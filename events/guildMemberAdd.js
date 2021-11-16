const { MessageEmbed } = require("discord.js");
const bot = require("../index.js").bot;

bot.on('guildMemberAdd', member => {
    if (bot.config[member.guild.id].channel != " "){
        if (member.user.bot){
            bot.channels.cache.get(bot.config[member.guild.id].channel).send({ content: "<@" + member.user.id + ">, chào mừng bạn đã đến với chốn tuyệt vời này!\n" + "Chúng ta cùng nhau cố gắng nhé! 😄" }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            let VT1 = bot.config[member.guild.id].botz;
            for (let i = 0; i < VT1.length; i++){
                member.roles.add(VT1[i]).catch(error => {
                    if (error.code !== 50013) {
                        console.error('Lỗi nữaaaaa:', error);
                    }
                    const embed1 = new MessageEmbed()
                        .setColor('#16FC35') 
                        .setTitle('Lỗi')
                        .setDescription('Bạn chủ kênh <@' + member.guild.ownerId + '> ơi.\n' +
                                        'Cảm phiền bạn xem lại vai trò của tôi đã **cao hơn** các vai trò dưới đây chưa bởi vì tôi không thể thêm chúng vào cho bạn `' + member.user.username + '` được. 😦') 
                        .addFields(
                            { name: 'Những vai trò cho máy mới đã có', value: bot.config[member.guild.id].botS + '.' },
                        )
                    bot.channels.cache.get(bot.config[member.guild.id].channel).send({ embeds: [embed1] });
                })
            }
        } else{
            bot.channels.cache.get(bot.config[member.guild.id].channel).send({ content: "<@" + member.user.id + ">, chào mừng bạn đã đến với chốn tuyệt vời này!\n" + "Chúc bạn có những giờ phút vui vẻ nhé! 😄" }).catch(error => {
                if (error.code !== 50013) {
                    console.error('Lỗi nữaaaaa:', error);
                }})
            let VT2 = bot.config[member.guild.id].userz;
            for (let j = 0; j < VT2.length; j++){
                member.roles.add(VT2[j]).catch(error => {
                    if (error.code !== 50013) {
                        console.error('Lỗi nữaaaaa:', error);
                    }
                    const embed2 = new MessageEmbed()
                        .setColor('#16FC35') 
                        .setTitle('Lỗi')
                        .setDescription('Bạn chủ kênh <@' + member.guild.ownerId + '> ơi.\n' +
                                        'Cảm phiền bạn xem lại vai trò của tôi đã **cao hơn** các vai trò dưới đây chưa bởi vì tôi không thể thêm chúng vào cho bạn `' + member.user.tag + '` được. 😦') 
                        .addFields(
                            { name: 'Những vai trò cho người dùng mới đã có', value: bot.config[member.guild.id].userS + '.' },
                        )
                    bot.channels.cache.get(bot.config[member.guild.id].channel).send({ embeds: [embed2] });
                });
            }
        }
    }
});