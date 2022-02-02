const { MessageEmbed } = require("discord.js");
const bot = require("./index.js").bot;

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
                    }})
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
                    }})
            }
        }
    }
});