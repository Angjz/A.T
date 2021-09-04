exports.run = async (bot, message, args, f1, f2) => {
	let msg = await message.channel.send("🥳👯🎉🎊🎊🎊🎉👯🥳");
 	msg.react('🥳');
	msg.react('👯');
	msg.react('🎉');
	msg.react('🎊');
}