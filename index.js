const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents });

const fs = require("fs");
const config = require("./data/guild.json");
const info = require("./data/user.json");
const bala_data = require("./data/bala.json");
const tokem = require("./data/token.json");

bot.events = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.newcomer = new Discord.Collection();
bot.buttons = new Discord.Collection();
bot.bala = new Discord.Collection();

module.exports.bot = bot;
bot.config = config;
bot.info = info;
bot.bala_data = bala_data;

//event handler 
fs.readdir("./event/", (err, files) =>{
   if (err) throw err;

   var jsFiles = files.filter(f => f.split(".").pop() === "js");
   if (jsFiles.length <= 0) return console.log("[QUẢN LÍ SỰ KIỆN] - Không tìm được sự kiện nào.");

  jsFiles.forEach(file =>{
      const eventGet = require(`./event/${file}`);
      console.log(`[QUẢN LÍ SỰ KIỆN] - File ${file} đã được nạp.`);

       try{
         bot.events.set(file.substring(0, file.length - 3), eventGet);
       } catch(err){
         return console.log(err);
      }
  })
});

//command handler
fs.readdir("./command/", (err, files) =>{
  if (err) throw err;

   var jsFiles = files.filter(f => f.split(".").pop() === "js");
   if (jsFiles.length <= 0) return console.log("[QUẢN LÍ LỆNH] - Không tìm được lệnh nào.")

  jsFiles.forEach(file =>{
      const fileGet = require(`./command/${file}`);
      console.log(`[QUẢN LÍ LỆNH] - File ${file} đã được nạp.`);
       try{
         bot.commands.set(file.substring(0, file.length - 3), fileGet);
       } catch (err){
         return console.log(err);
      }
   })
});

//newcomer
fs.readdir("./command/.newcomer", (err, files) =>{
  if (err) throw err;

  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("[QUẢN LÍ NEWCOMER] - Không tìm được lệnh nào.");

 jsFiles.forEach(file =>{
     const fileGet = require(`./commands/.newcomer/${file}`);    

      try{
        bot.newcomer.set(file.substring(0, file.length - 3), fileGet);
        console.log(`[QUẢN LÍ NEWCOMER] - File ${file} đã được nạp.`);
      } catch(err){
        return console.log(err);
     }
  })
});

//button
fs.readdir("./button", (err, files) =>{
  if (err) throw err;

  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("[QUẢN LÍ NÚT] - Không tìm được lệnh nào.");

 jsFiles.forEach(file =>{
     const fileGet = require(`./button/${file}`);    

      try{
        bot.buttons.set(file.substring(0, file.length - 3), fileGet);
        console.log(`[QUẢN LÍ NÚT] - File ${file} đã được nạp.`);
      } catch(err){
        return console.log(err);
     }
  })
});

//bala
fs.readdir("./command/.bala", (err, files) =>{
  if (err) throw err;

  var jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("[QUẢN LÍ BALA] - Không tìm được lệnh nào.");

 jsFiles.forEach(file =>{
     const fileGet = require(`./command/.bala/${file}`);    

      try{
        bot.bala.set(file.substring(0, file.length - 3), fileGet);
        console.log(`[QUẢN LÍ BALA] - File ${file} đã được nạp.`);
      } catch(err){
        return console.log(err);
     }
  })
});

bot.login(tokem.token);