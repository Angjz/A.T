const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    if (args.length == 1){
        const embed = new MessageEmbed()
            .setColor('#5432EA') //tím nhạt
            .setTitle('Emoji')
            .setDescription('Lấy emoji tùy chỉnh của bạn dưới định dạng png! To hơn! Dễ nhìn hơn! Đẹp hơn!')
            .addFields(
                { name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'emoji <emoji_1> <emoji_2> ... <emoji_n>' },
                { name: 'Lưu ý', value: 'Kết quả có thể không chính xác nếu dữ liệu đầu vào sai\nBạn nên mở bảng chọn emoji rồi chọn từ đó để cho kết quả chính xác nhất' }
            )
        message.channel.send({ embeds: [embed] }).catch(error => {
            if (error.code !== 50013) {
                console.error('Lỗi nữaaaaa:', error);
            }})
        return;
    } else{
        let count = 1;
        while (args[count]){
            if ( args[count].includes("<") && args[count].includes(">") && args[count].includes(":") ){
                let emoji = args[count].split(':')[2];
                emoji = emoji.split('>')[0];
                message.channel.send( "https://cdn.discordapp.com/emojis/" + emoji + ".png" ).catch(error => {
                    if (error.code !== 50013) {
                        console.error('Lỗi nữaaaaa:', error);
                    }})
            }
            count++;
        }
    }
}