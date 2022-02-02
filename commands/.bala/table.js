const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    let code = bot.info[message.author.id].code;
    let count = 0;
	let idz = [];
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		count++;
		idz.push(bot.bala_data[code].p[k].id);
	}

	let list = "";
	for (var i = 0; i < idz.length; i++) list += '<@' + idz[i] + '>, ';
	list = list.slice(0, list.length - 2);
	const embed = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + bot.bala_data[code].chu + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + count + '\n\n' +
						'Tham gia: `' + bot.config[message.guild.id].prefix + 'bala join @' + bot.bala_data[code].chu_2 + '`\n'+
						'Thoát bàn: `' + bot.config[message.guild.id].prefix + 'bala quit`\n' +
						'Xem bàn: `' + bot.config[message.guild.id].prefix + 'bala table`\n\n' +
						'Đổi tiền cược: `' + bot.config[message.guild.id].prefix + 'bala bet`\n'+
						'Bắt đầu: `' + bot.config[message.guild.id].prefix + 'bala start`\n')
        .addFields(
			{ name: 'Tiền cược', value: cuoc + '(VND)' },
			{ name: 'Danh sách người chơi', value: list + '' },
       	)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}