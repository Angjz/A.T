exports.run = async (bot, message, args, f1, f2) => {
    if (message.author.id != '553975621311528961') return;
    await message.channel.send({ content: 'Hẹn gặp lại bạn sau. Ngủ ngon nhé! 😘' }).catch(error => {
        if (error.code !== 50013) {
            console.error('Lỗi nữaaaaa:', error);
        }})
    bot.destroy();
}