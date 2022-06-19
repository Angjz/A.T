const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
	const embed = new MessageEmbed()
		.setColor('#FC8C16') //xanh la nhat
		.addFields(
			{ name: 'Mã nguồn của tôi:', value: 'https://github.com/Angjz/A.T' }
		)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}