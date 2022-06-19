const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
	const embed = new MessageEmbed()
		.setColor('#FC8C16') //cam
		.addFields(
			{ name: '❤️ Các lệnh hữu dụng của tôi:', value: '`feedback`, `code`, `server`, `emoji`, `avatar`, `prefix`, `newcomer`' },
			{ name: '🥳 Một số điều vui vẻ khác:', value: '`party`, `bala`\n\n' +
					'Prefix hiện tại của bạn: `' + bot.config[message.guild.id].prefix + '`\n\n' +
					'Ngoài ra, cứ gọi tôi nếu bạn chẳng may quên prefix nhé! 😄' },
		)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}