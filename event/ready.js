const bot = require("../index.js").bot;
const fs = require("fs");
const f = "./data/bala.json";
const f2 = "./data/user.json";

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
		console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} thành viên / ${guild.members.cache.filter((member) => !member.user.bot).size} người / ${guild.members.cache.filter((member) => member.user.bot).size} máy`);
	})

	bot.api.applications(bot.user.id).commands.post({
        data: {
            name: "help",
            description: "Xem các lệnh của tôi!"
        }})

	bot.bala_data = {}
	fs.writeFileSync(f, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	for (let i in bot.info){
		if (i == "880842350459486258") continue;
		bot.info[i].bala.phong = 0;
		bot.info[i].bala.chu = 0;
		bot.info[i].bala.code = ".";
		bot.info[i].bala.start = 0;
		bot.info[i].bala.cuoc = ".";
		fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
			if (err) throw err;
		});
	}

	bot.user.setActivity("Xin chào thế giới! 😄", { type: 'PLAYING' });
})