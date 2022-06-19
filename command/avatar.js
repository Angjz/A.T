const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
    const embed = new MessageEmbed()
		.setColor('#FC16F2') //hồng
		.setTitle('Avatar')
		.setDescription('Bạn thấy hình đại diện của ai đó quá đẹp ư? Tìm không đâu xa nữa!')
		.addFields(
			{ name: 'Sử dụng', value: bot.config[message.guild.id].prefix + 'avatar @<ai đó>', inline: true },
			{ name: 'Ví dụ', value: bot.config[message.guild.id].prefix + 'avatar @Ang', inline: true },
		)

	let user = message.mentions.users.first();
	if (!args[1]){
		message.channel.send({ embeds: [embed] }).catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
		return;
	}
	if (!user){
		message.channel.send({ embeds: [embed] }).catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
		return;
	}
	let avatar = user.displayAvatarURL();
	avatar = avatar.slice(0, (avatar.length - 4));
	avatar = avatar + "png";
	message.channel.send({ content:"Đây là hình đại diện của `" + user.tag + "`:\n" + avatar }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}