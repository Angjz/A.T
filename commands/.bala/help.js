const { MessageEmbed } = require("discord.js");

exports.run4 = (bot, message, args, f1, f2) => {
    const embed = new MessageEmbed()
        .setColor('#FBFF08') 
        .setTitle('Ba lá - luật chơi')
        .setDescription('Một ván chơi bao gồm hai người chơi, mỗi người chơi sẽ tự bốc cho tới khi đủ ba lá bài hoặc ra hiệu sẵn sàng sớm để hệ thống tự động bốc bài. Khi đủ bài, ra hiệu sẵn sàng để đối chiếu với đối thủ. Người thắng là người cao điểm hơn và sẽ được tiền cược của cả hai.\n\n'+
                        'Cách tính điểm như sau:\n'+
                        ' + Lá: A được tính một điểm.\n'+
                        ' + Các lá: 2, 3, 4, 5, 6, 7, 8, 9, 10 mỗi lá có số điểm tương ứng con số đó.\n'+
                        ' + Các lá: J, Q, K mỗi lá tính mười điểm.\n\n'+
                        'Điểm của người chơi trong mỗi ván là số lẻ của tổng điểm ba lá bài. Ví dụ, tổng ba lá là 27 điểm thì được 7 điểm, 10 điểm thì được 0 điểm. Trường hợp đặc biệt là ai sở hữu được cả ba lá bài J, Q, K bất kỳ thì thắng ngay ván đó không cần tính điểm. Bài ba lá không quan tâm đến chất của mỗi lá bài.')
    message.channel.send({ embeds: [embed] }); 
}