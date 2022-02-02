const { MessageEmbed } = require("discord.js");
const bot = require("../index.js").bot;
const f1 = "./data/guilds.json";
const f2 = "./data/users.json";

bot.on('interactionCreate', async interaction=>{
	if (interaction.isCommand()){
		if (interaction.commandName === 'help'){
			const embed = new MessageEmbed()
				.setColor('#FC8C16') //cam
				.addFields(
					{ name: '❤️ Các lệnh hữu dụng của tôi:', value: '`feedback`, `prefix`, `avatar`, `newcomer`' },
					{ name: '🥳 Một số điều vui vẻ khác:', value: '`party`, `bala`\n\n' +
							'Prefix hiện tại của bạn: `' + bot.config[interaction.guild.id].prefix + '`\n\n' +
							'Ngoài ra, cứ gọi tôi nếu bạn chẳng may quên prefix nhé! 😄' },
				)
			await interaction.reply({ embeds: [embed], ephemeral: true }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
		}
	}

	if (interaction.isButton()){
		const cmd = bot.buttons.get(interaction.customId);
    	if (!cmd) return;
		cmd.run(bot, interaction, f1, f2);
	}
})