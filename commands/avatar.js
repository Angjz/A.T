const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    const embed = new MessageEmbed()
		.setColor('#FC16F2') //hồng
		.setTitle('Avatar')
		.setDescription('Bạn thấy hình đại diện của ai đó quá đẹp ư? Tìm không đâu xa nữa!')
		.addFields(
			{ name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'avatar @<ai đó>', inline: true },
			{ name: 'Ví dụ', value: bot.config[message.guild.id].prefix + 'avatar @Ang', inline: true },
			{ name: 'Hình đại diện hội', value: bot.config[message.guild.id].prefix + 'avatar guild', inline: true },
		)

	let user = message.mentions.users.first();
	if (!args[1]){
		message.channel.send({ embeds: [embed] });
		return;
	}
	if (args[1] == "guild"){
		message.channel.send({ content:"Đây là hình đại diện của hội " + message.guild.name + `:\n` + message.guild.iconURL() });
		return;
	}
	if (!user){
		message.channel.send({ embeds: [embed] });
		return;
	}
	message.channel.send({ content:"Đây là hình đại diện của " + user.username + `:\n` + user.displayAvatarURL() });
}