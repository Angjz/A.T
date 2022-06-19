const { MessageEmbed } = require("discord.js");

exports.run = (bot, message, args, f1, f2) => {
	let name = message.guild.name;
	let owner = bot.users.cache.get(message.guild.ownerId).tag;
	let serverIcon = message.guild.iconURL();
	let createdAt = message.guild.createdAt;
	createdAt = createdAt.toISOString().split('T')[0];
	let ngay = createdAt.slice(8, 10);
	let thang = createdAt.slice(5, 7);
	let nam = createdAt.slice(0, 4);
	let ngayTao = ngay + "/" + thang + "/" + nam;
	let mMem = message.guild.memberCount;
	let hMem = message.guild.members.cache.filter((member) => !member.user.bot).size;
	let bMem = message.guild.members.cache.filter((member) => member.user.bot).size;

	const embed = new MessageEmbed()
		.setColor('#B2FF33') //xanh chuoi
		.addFields(
			{ name: 'Tên máy chủ', value: name, inline: true },
			{ name: 'Chủ sở hữu', value: owner, inline: true },
			{ name: 'Ngày tạo', value: ngayTao, inline: true },
			{ name: 'Tổng thành viên', value: mMem + ' thành viên', inline: true },
			{ name: 'Số người dùng', value: hMem + ' người', inline: true },
			{ name: 'Số người máy', value: bMem + ' máy', inline: true }	
		)
		.setThumbnail(serverIcon)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}