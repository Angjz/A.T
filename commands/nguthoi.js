exports.run = (bot, message, args, f1, f2) => {
    if (message.author.id != '553975621311528961') return;
    message.channel.send({ content: 'Hẹn gặp lại bạn sau. Ngủ ngon nhé! 😘' })
    bot.destroy();
}