const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
	const embed = new MessageEmbed()
		.setColor('#8708FF') //tím
		.addFields(
			{ name: 'Báo lỗi hoặc đóng góp ý kiến', value: 'Ang#7131' },
		)
	message.channel.send({ embeds: [embed] });
}