const fs = require("fs");

module.exports.jointer = (args, b) => {
	let str = "";
	str = args[b].slice(1, args[b].length);
	let i = ++b;
	while (!args[i].endsWith("]")){
		str += ' ';
		str += args[i];
		i++;
	}
	str += ' ';
	str += args[i].slice(0, --args[i].length);
	let result = [str, i];
	return result;
}

module.exports.update_newcomer = (bot, message, f) => {
	let botz = bot.config[message.guild.id].botS;
	let botz_id = bot.config[message.guild.id].botz;
	let userz = bot.config[message.guild.id].userS;
	let userz_id = bot.config[message.guild.id].userz;
	
	let i = 0;
	while (i < botz_id.length){
		if (message.guild.roles.cache.find(r => r.id === botz_id[i])){
			botz[i] = message.guild.roles.cache.get(botz_id[i]).name;
			i++;
		} else{
			botz_id.splice(i, 1);
			botz.splice(i, 1);
			i = 0;
		}
	}

	let j = 0;
	while (j < userz_id.length){
		if (message.guild.roles.cache.find(r => r.id === userz_id[j])){
			userz[j] = message.guild.roles.cache.get(userz_id[j]).name;
			j++;
		} else{
			userz_id.splice(j, 1);
			userz.splice(j, 1);
			j = 0;
		}	
	}
	
	bot.config[message.guild.id].botz = botz_id;
	bot.config[message.guild.id].botS = botz;
	bot.config[message.guild.id].userz = userz_id;
	bot.config[message.guild.id].userS = userz;
	fs.writeFileSync(f, JSON.stringify(bot.config, null, 4), err => {
		if (err) throw err;
	});
}