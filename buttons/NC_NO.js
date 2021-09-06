const { MessageEmbed } = require("discord.js");
const fs = require("fs");

exports.run3 = (bot, interaction, f1, f2) => {
	temp = bot.config[interaction.guild.id].temp;
	if (interaction.user.id != temp[0]){
		interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
	}
    bot.guilds.cache.get(temp[1]).channels.cache.get(temp[2]).messages.fetch(temp[3]).then(msg => msg.delete());
	let tempo = temp[1];
	temp[0] = temp[1] = temp[2] = temp[3] = ".";
	
	bot.config[tempo].temp = temp; 
	fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
		if (err) throw err;
	});
	const embed = new MessageEmbed()
		.setColor('#16FC35') 
		.setTitle('Newcomer')
		.setDescription('Đã hủy quá trình. Chúc bạn tìm được kênh mong muốn khác nhé!') 
	interaction.channel.send({ embeds: [embed] });
}