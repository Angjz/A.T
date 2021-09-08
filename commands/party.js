exports.run = async (bot, message, args, f1, f2) => {
	let msg = await message.channel.send("🥳👯🎉🎊🎊🎊🎉👯🥳").catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
 	if (msg){
		msg.react('🥳').catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
		msg.react('👯').catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
		msg.react('🎉').catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
		msg.react('🎊').catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
	}
}