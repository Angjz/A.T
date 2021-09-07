const bot = require("../index.js").bot;
const functions = require("../functions.js");
const f3 = "./data/bala.json";

bot.on('messageDelete', message=>{
    if (!bot.bala_data[message.id]) return;
    if (!bot.bala_data[message.id].code) return;

    let code = bot.bala_data[message.id].code;
    if (!bot.bala_data[code].chu){
        bot.bala_data[message.id] = {};
        functions.viet_file(bot);
        return;
    }

    let chu = bot.bala_data[code].chu;
    let cuoc = bot.bala_data[code].cuoc;
    let danhsach = bot.bala_data[code].danhsach;

    if (bot.info[chu].bala.phong == 1) functions.ba_la1(bot, message, code, chu, cuoc, danhsach, f3);
    else functions.ba_la2(bot, message, code, chu, cuoc, danhsach, f3);
});
