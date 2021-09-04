const { MessageEmbed } = require("discord.js");
let temp = require("../index.js").temp;
const fs = require("fs");

exports.run3 = (bot, interaction, f1, f2) => {
	temp = bot.config[interaction.guild.id].temp;
	if (interaction.user.id != temp[0]){
		interaction.reply({ content: "Này! Những nút này không phải dành cho bạn!", ephemeral: true })
		return;
	}
    bot.guilds.cache.get(temp[1]).channels.cache.get(temp[2]).messages.fetch(temp[3]).then(msg => msg.delete());
	let tempo1 = temp[1];
	let tempo2 = temp[2];
	temp[0] = temp[1] = temp[2] = temp[3] = ".";
		bot.config[tempo1] = {
			name: bot.config[tempo1].name,
			prefix: bot.config[tempo1].prefix,
			channel: tempo2,
			temp: temp,
			botz: bot.config[tempo1].botz,
			botS: bot.config[tempo1].botS,
			userz: bot.config[tempo1].userz,
			userS: bot.config[tempo1].userS,
		}
		fs.writeFile(f1, JSON.stringify(bot.config, null, 4), err => {
			if (err) throw err;
		});
		let trannel = bot.guilds.cache.get(tempo1).channels.cache.get(tempo2);
		const embed = new MessageEmbed()
			.setColor('#16FC35') 
			.setTitle('Newcomer')
			.setDescription('Đã xác nhận. Kênh được chọn sẽ là: <#' + trannel + '>') 
		interaction.channel.send({ embeds: [embed] });
}