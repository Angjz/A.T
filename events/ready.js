const bot = require("../index.js").bot;

bot.on('ready', () =>{	
	let ts = Date.now();
	let date_ob = new Date(ts);
	let date = date_ob.getDate();
	let month = date_ob.getMonth() + 1;
	let year = date_ob.getFullYear();
	console.log();
	console.log(date + "/" + month + "/" + year);
	console.log("- Xin chào! :)");
	console.log("- Tôi đang ở trong: " + bot.guilds.cache.size + " kênh.");
	console.log("- Danh sách các kênh:");
	bot.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} thành viên`);
	})
	bot.user.setActivity("Xin chào thế giới! 😄", { type: 'PLAYING' });
})