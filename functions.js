const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const functions = require("./functions.js");
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

module.exports.fisherYates = ( myArray ) => {
	let i = myArray.length;
	if ( i == 0 ) return;
	while ( --i ) {
	   let j = Math.floor( Math.random() * ( i + 1 ) );
	   [ myArray[i], myArray[j] ] = [ myArray[j], myArray[i] ];
	}
	return myArray;
}

module.exports.set_default = (bot, guild, guild_id, f) => {
	bot.config[guild_id] = {
		name: guild,
		prefix: "&",
		channel: " ",
		temp: [".", ".", ".", "."],
		botz: [""],
		botS: [""],
		userz: [""],
		userS: [""]
	}
	fs.writeFileSync(f, JSON.stringify(bot.config, null, 4), err => {
		if (err) throw err;
	});
	return;
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
	bot.config[message.guild.id] = {
		name: bot.config[message.guild.id].name,
		prefix: bot.config[message.guild.id].prefix,
		channel: bot.config[message.guild.id].channel,
		temp: bot.config[message.guild.id].temp,
		botz: botz_id,
		botS: botz,
		userz: userz_id,
		userS: userz,
	}
	fs.writeFileSync(f, JSON.stringify(bot.config, null, 4), err => {
		if (err) throw err;
	});
	return;
}

//bala
module.exports.ba_la_het = (bot, message, code) => {
	if (!bot.bala_data[code].cuoc) return;

	let diem1 = bot.bala_data[code].p1.diem;
	let diem2 = bot.bala_data[code].p2.diem;
	let tay1 = bot.bala_data[code].p1.bai;
	let tay2 = bot.bala_data[code].p2.bai;
	let p1 = bot.bala_data[code].p1.id;
	let p2 = bot.bala_data[code].p2.id;
	let name1 = bot.bala_data[code].p1.uname;
	let name2 = bot.bala_data[code].p2.uname;
	let dis1 = bot.bala_data[code].p1.dis;
	let dis2 = bot.bala_data[code].p2.dis;
	let tien1 = bot.info[p1].bala.tien;
	let tien2 = bot.info[p2].bala.tien;
	let cuoc = bot.bala_data[code].cuoc;

	let bai = [
		"Át Bích", "2 Bích", "3 Bích", "4 Bích", "5 Bích", "6 Bích", "7 Bích", "8 Bích", "9 Bích", "10 Bích", "Bồi J Bích", "Đầm Q Bích", "Già K Bích",
		"Át Chuồn", "2 Chuồn", "3 Chuồn", "4 Chuồn", "5 Chuồn", "6 Chuồn", "7 Chuồn", "8 Chuồn", "9 Chuồn", "10 Chuồn", "Bồi J Chuồn", "Đầm Q Chuồn", "Già K Chuồn",
		"Át Rô", "2 Rô", "3 Rô", "4 Rô", "5 Rô", "6 Rô", "7 Rô", "8 Rô", "9 Rô", "10 Rô", "Bồi J Rô", "Đầm Q Rô", "Già K Rô",
		"Át Cơ", "2 Cơ", "3 Cơ", "4 Cơ", "5 Cơ", "6 Cơ", "7 Cơ", "8 Cơ", "9 Cơ", "10 Cơ", "Bồi J Cơ", "Đầm Q Cơ", "Già K Cơ"
	]
	tay1 = [ ' '+bai[tay1[0]], ' '+bai[tay1[1]], ' '+bai[tay1[2]] ];
	tay2 = [ ' '+bai[tay2[0]], ' '+bai[tay2[1]], ' '+bai[tay2[2]] ]; 
		
	if (diem1 == diem2){
		if (diem1 == 227){
			diem1 = diem2 = "**Ba cào**";
		}
		if (diem1 == 0){
			diem1 = diem2 = "**Bù**";
		}
		const embed1 = new MessageEmbed()
        	.setColor('#FBFF08')
        	.setTitle('Ba lá - chơi')
        	.setDescription('Trò chơi của <@' + p1 + '> và <@' + p2 + '>.\n'+
							'Phòng: `' + code + '`\n\n'+
							'Bài của `' + name1 + '#' + dis1 + '`:' + tay1 + '\n'+
							'Bài của `' + name2 + '#' + dis2 + '`:' + tay2)
        	.addFields(
				{ name: 'Kết quả', value: 'Hòa!', inline: true },
				{ name: 'Số điểm của ' + name1 + '#' + dis1, value: diem1 + ".", inline: true },
            	{ name: 'Số điểm của ' + name2 + '#' + dis2, value: diem2 + ".", inline: true },
				{ name: 'Tiền cược', value: cuoc + '(VND)', inline: true },
				{ name: 'Tiền của ' + name1 + '#' + dis1, value: tien1 + '(VND)', inline: true },
        		{ name: 'Tiền của ' + name2 + '#' + dis2, value: tien2 + '(VND)', inline: true },
       	 	)
		message.channel.send({ embeds: [embed1] });
		functions.cap_nhat(bot, code, tien1, diem1, p1, "./data/users.json", "./data/bala.json", 0);
		functions.cap_nhat(bot, code, tien2, diem2, p2, "./data/users.json", "./data/bala.json", 0);
		return;
	}

	let winner = "";
	if (diem1 > diem2) winner = p1;
	else winner = p2;

	if (winner == p1){
		if (diem1 == 227) diem1 = "**Ba cào**";
		if (diem2 == 0) diem2 = "**Bù**";
		tien1 = functions.them_tien(tien1, cuoc, "cong");
		tien2 = functions.them_tien(tien2, cuoc, "tru");
	} else{
		if (diem2 == 227) diem2 = "**Ba cào**";
		if (diem1 == 0) diem1 = "**Bù**";
		tien2 = functions.them_tien(tien2, cuoc, "cong");
		tien1 = functions.them_tien(tien1, cuoc, "tru");
	}

	const embed2 = new MessageEmbed()
		.setColor('#FBFF08')
		.setTitle('Ba lá - chơi')
		.setDescription('Trò chơi của <@' + p1 + '> và <@' + p2 + '>.\n'+
						'Phòng: `' + code + '`\n\n'+
						'Bài của `' + name1 + '#' + dis1 + '`:' + tay1 + '\n'+
						'Bài của `' + name2 + '#' + dis2 + '`:' + tay2)
		.addFields(
			{ name: 'Kết quả', value: '<@' + winner + '> thắng!', inline: true },
			{ name: 'Số điểm của ' + name1 + '#' + dis1, value: diem1 + ".", inline: true },
			{ name: 'Số điểm của ' + name2 + '#' + dis2, value: diem2 + ".", inline: true },
			{ name: 'Tiền cược', value: cuoc + '(VND)', inline: true },
			{ name: 'Tiền của ' + name1 + '#' + dis1, value: tien1 + '(VND)', inline: true },
			{ name: 'Tiền của ' + name2 + '#' + dis2, value: tien2 + '(VND)', inline: true },
		)
	message.channel.send({ embeds: [embed2] });
	
	if (winner == p1){
		functions.cap_nhat(bot, code, tien1, diem1, p1, "./data/users.json", "./data/bala.json", 1);
		functions.cap_nhat(bot, code, tien2, diem2, p2, "./data/users.json", "./data/bala.json", 0);
	} else{
		functions.cap_nhat(bot, code, tien2, diem2, p2, "./data/users.json", "./data/bala.json", 1);
		functions.cap_nhat(bot, code, tien1, diem1, p1, "./data/users.json", "./data/bala.json", 0);
	}
	return;
}

module.exports.cap_nhat = (bot, code, tien, diem, p, f2, f3, thang) => {
	bot.bala_data[code] = {};
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	let bacao = 0;
	let bu = 0
	if (diem == "**Ba cào**") bacao = 1;
	if (diem == 0) bu = 1;

	bot.info[p] = {
		ten: bot.info[p].ten,
		bala: {
			tien: tien,
			choi: bot.info[p].bala.choi + 1,
            cthang: bot.info[p].bala.cthang + thang,
            ba_cao: bot.info[p].bala.ba_cao + bacao,
            bu: bot.info[p].bala.bu + bu,
            phong: 0,
			code: ".",
			start: 0,
			cuoc: 0,
			o_name: ".",
			o_dis: ".",
			o_id: ".",
            ngay: bot.info[p].bala.ngay,
            thang: bot.info[p].bala.thang,
            nam: bot.info[p].bala.nam,
            t_ngay: bot.info[p].bala.t_ngay,
            t_thang: bot.info[p].bala.t_thang,
            t_nam: bot.info[p].bala.t_nam,
		},
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});
}

module.exports.tinh_diem = ( Array ) => {
	let diem = 0;
	bai = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0,
		1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0
	]
	bacao = [
		10, 11, 12, 23, 24, 25, 36, 37, 38, 49, 50, 51
	]

	if (Array.length == 3){
		let win = 0;
		for (i = 0; i < 3; i++)
			for (j = 0; j < bacao.length; j++)
				if (Array[i] == bacao[j]){
					win++;
					break;
				}
		if (win == 3) return 227;
	}

	for (i = 0; i < Array.length; i++) diem += bai[Array[i]];
	return (diem % 10);
}

module.exports.ba_la = (bot, message, p1, p2, cuoc, code, f3) => {
	const embed1 = new MessageEmbed()
		.setColor('#FBFF08')
		.setTitle('Ba lá - chơi')
        .setDescription('Trò chơi của <@' + p2 + '> và <@' + p1 + '>.\n'+
						'Phòng: `' + code + '`\n'+
						'Hai bạn có 60 giây để bốc đủ ba lá bài hoặc bấm "sẵn sàng" để hệ thống tự động bốc.') 
        .addFields(
            { name: 'Mức cược', value: cuoc + '(VND)' },
        )
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setCustomId("BALA_BB")
            .setLabel("BỐC BÀI")
            .setStyle("PRIMARY"),
        new MessageButton()
            .setCustomId("BALA_SS")
            .setLabel("SẴN SÀNG")
            .setStyle("SUCCESS")
    );
    message.channel.send({ embeds: [embed1], components: [row] })
        .then(msg=>{
			bot.bala_data[msg.id] = {
				code: code,
			}
			fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
				if (err) throw err;
			});
            setTimeout(function() {
                msg.delete().catch(error => {
                    if (error.code !== 10008) {
                        console.error('Lỗi nữaaaaa:', error);
                    }
                });
                functions.ba_la_het(bot, message, code);
            }, 60000)
        });
}

module.exports.set_user = (bot, message, f) => {
	bot.info[message.author.id] = {
		ten: message.author.username,
		bala: {
			tien: "0",
			choi: 0,
            cthang: 0,
            ba_cao: 0,
            bu: 0,
            phong: 0,
			code: ".",
			start: 0,
			cuoc: 0,
			o_name: ".",
			o_dis: ".",
			o_id: ".",
            ngay: 0,
            thang: 0,
            nam: 0,
            t_ngay: 0,
            t_thang: 0,
            t_nam: 0
		},
	}
	fs.writeFileSync(f, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});
	return;
}

module.exports.tach_tien = (a, b) => {
	let bac = 0;
	for (let i = a.length -1; i >= 0; i--){
		if ( isNaN(Number(a[i])) ) continue;
		b += Number(a[i]) * 10 ** bac;
		bac++;
	}
	return b;
}

module.exports.ghep_tien = (a, b) => {
	a = a.toString();
	let dem = 0;
	for (let i = a.length -1; i >= 0; i--){
		if (dem == 3){
			dem = 0;
			b = '.' + b;
		}
		dem++;
		b = a[i] + b;
	}
	return b;
}

module.exports.them_tien = (tien, giatri, pt) => {
	let tienz = 0;
	let gt = 0;
	let tieng = "";

	tienz = functions.tach_tien(tien, tienz);
	gt = functions.tach_tien(giatri, gt);
	if (pt == "cong") tieng = functions.ghep_tien(tienz + gt, tieng);
	else tieng = functions.ghep_tien(tienz - gt, tieng);

	return tieng;
}

module.exports.code_phong = () => {
	let array = [
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
	]
	let code = "";
	
	array = functions.fisherYates(array)
	for (let i = 1; i <= 5; i ++)
		code += array[Math.floor( Math.random() * array.length )];
	return code;
}

module.exports.tao_phong = (bot, message, mention, ban, tiencuoc, f2, f3) => {
	let code = functions.code_phong();

	bot.info[message.author.id] = {
		ten: bot.info[message.author.id].ten,
		bala: {
			tien: bot.info[message.author.id].bala.tien,
			choi: bot.info[message.author.id].bala.choi,
            cthang: bot.info[message.author.id].bala.cthang,
            ba_cao: bot.info[message.author.id].bala.ba_cao,
            bu: bot.info[message.author.id].bala.bu,
            phong: 1,
			code: code,
			start: 0,
			cuoc: ban,
			o_name: mention.username,
			o_dis: mention.discriminator,
			o_id: mention.id,
            ngay: bot.info[message.author.id].bala.ngay,
            thang: bot.info[message.author.id].bala.thang,
            nam: bot.info[message.author.id].bala.nam,
            t_ngay: bot.info[message.author.id].bala.t_ngay,
            t_thang: bot.info[message.author.id].bala.t_thang,
            t_nam: bot.info[message.author.id].bala.t_nam,
		},
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.bala_data[code] = {
		cuoc: tiencuoc,
		bai: [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25, 26, 27, 28,
			29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51
		],
		p1:{
			id: message.author.id,
			uname: message.author.username,
			dis: message.author.discriminator,
			diem: 0,
			bai: [],
			xong: 0
		},
		p2:{
			id: mention.id,
			uname: mention.username,
			dis: mention.discriminator,
			diem: 0,
			bai: [],
			xong: 0
		}
	}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});
}

module.exports.thoat_phong = (bot, message, f2, f3) => {
	bot.bala_data[bot.info[message.author.id].bala.code] = {}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	bot.info[message.author.id] = {
		ten: bot.info[message.author.id].ten,
		bala: {
			tien: bot.info[message.author.id].bala.tien,
			choi: bot.info[message.author.id].bala.choi,
            cthang: bot.info[message.author.id].bala.cthang,
            ba_cao: bot.info[message.author.id].bala.ba_cao,
            bu: bot.info[message.author.id].bala.bu,
            phong: 0,
			code: ".",
			start: 0,
			cuoc: 0,
			o_name: ".",
			o_dis: ".",
			o_id: ".",
            ngay: bot.info[message.author.id].bala.ngay,
            thang: bot.info[message.author.id].bala.thang,
            nam: bot.info[message.author.id].bala.nam,
            t_ngay: bot.info[message.author.id].bala.t_ngay,
            t_thang: bot.info[message.author.id].bala.t_thang,
            t_nam: bot.info[message.author.id].bala.t_nam,
		},
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});
}

module.exports.tham_gia_phong = (bot, message, mention, f2, f3) => {
	bot.info[message.author.id] = {
		ten: bot.info[message.author.id].ten,
		bala: {
			tien: bot.info[message.author.id].bala.tien,
			choi: bot.info[message.author.id].bala.choi,
            cthang: bot.info[message.author.id].bala.cthang,
            ba_cao: bot.info[message.author.id].bala.ba_cao,
            bu: bot.info[message.author.id].bala.bu,
            phong: 1,
			code: bot.info[mention.id].bala.code,
			start: 1,
			cuoc: bot.info[mention.id].bala.cuoc,
			o_name: mention.username,
			o_dis: mention.discriminator,
			o_id: mention.id,
            ngay: bot.info[message.author.id].bala.ngay,
            thang: bot.info[message.author.id].bala.thang,
            nam: bot.info[message.author.id].bala.nam,
            t_ngay: bot.info[message.author.id].bala.t_ngay,
            t_thang: bot.info[message.author.id].bala.t_thang,
            t_nam: bot.info[message.author.id].bala.t_nam,
		},
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.info[mention.id] = {
		ten: bot.info[mention.id].ten,
		bala: {
			tien: bot.info[mention.id].bala.tien,
			choi: bot.info[mention.id].bala.choi,
            cthang: bot.info[mention.id].bala.cthang,
            ba_cao: bot.info[mention.id].bala.ba_cao,
            bu: bot.info[mention.id].bala.bu,
            phong: 1,
			code: bot.info[mention.id].bala.code,
			start: 1,
			cuoc: bot.info[mention.id].bala.cuoc,
			o_name: bot.info[mention.id].bala.o_name,
			o_dis: bot.info[mention.id].bala.o_dis,
			o_id: bot.info[mention.id].bala.o_id,
            ngay: bot.info[mention.id].bala.ngay,
            thang: bot.info[mention.id].bala.thang,
            nam: bot.info[mention.id].bala.nam,
            t_ngay: bot.info[mention.id].bala.t_ngay,
            t_thang: bot.info[mention.id].bala.t_thang,
            t_nam: bot.info[mention.id].bala.t_nam,
		},
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	let code = bot.info[mention.id].bala.code;
	let cuoc = bot.bala_data[code].cuoc;
	
	functions.ba_la(bot, message, message.author.id, mention.id, cuoc, code, f3)
}

module.exports.viet_file = (bot) => {
	fs.writeFile("./data/bala.json", JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});
}
//het bala