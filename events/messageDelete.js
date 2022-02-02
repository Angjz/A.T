const bot = require("../index.js").bot;
const functions = require("../functions/function_bala.js");
const f3 = "./data/bala.json";

bot.on('messageDelete', message=>{
    if (!bot.bala_data[message.id]) return;
    if (bot.bala_data[message.id].code == 227) return;

    let chu = bot.bala_data[code].chu;
    let cuoc = bot.bala_data[code].cuoc;
    let danhsach = bot.bala_data[code].danhsach;
    let sansang = bot.bala_data[code].sansang;

    functions.ba_la(bot, message, code, chu, cuoc, danhsach, sansang, f3);
});
