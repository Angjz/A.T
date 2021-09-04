const bot = require("../index.js").bot;
const functions = require("../functions.js");
const f3 = "./data/bala.json";

bot.on('messageDelete', message=>{
    if (!bot.bala_data[message.id]) return;
    if (!bot.bala_data[message.id].code) return;

    let code = bot.bala_data[message.id].code;
    if (!bot.bala_data[code].cuoc){
        bot.bala_data[message.id] = {};
        functions.viet_file(bot);
        return;
    }

    let cuoc = bot.bala_data[code].cuoc;
    let p1 = bot.bala_data[code].p1.id;
    let p2 = bot.bala_data[code].p2.id;
    functions.ba_la(bot, message, p1, p2, cuoc, code, f3);
});
