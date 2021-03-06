const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const functions = require("./function_bala.js");
const shuff = require("./function_general.js");
const fs = require("fs");

module.exports.set_user = (bot, message, f) => {
	bot.info[message.author.id] = {
		ten: message.author.tag,
		id: message.author.id,
		bala: {
			tien: "0",
			choi: 0,
            cthang: 0,
            ba_cao: 0,
            bu: 0,
            phong: 0,
			chu: 0,
			code: ".",
			start: 0,
			cuoc: ".",
            ngay: 0,
            thang: 0,
            nam: 0,
            t_ngay: 0,
            t_thang: 0,
            t_nam: 0,
			streak1: 0,
			streak2: 0,
		}
	}
	fs.writeFileSync(f, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});
}

module.exports.tao_phong1 = (bot, message, tiencuocz, f2, f3) => {
	//dữ liệu
	let code = functions.code_phong();

	bot.info[message.author.id].bala.phong = 1;
	bot.info[message.author.id].bala.code = code;
	bot.info[message.author.id].bala.start = 1;
	bot.info[message.author.id].bala.cuoc = tiencuocz;
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.bala_data[code] = {
		chu: message.author.id,
		cuoc: tiencuocz,
		msg: ".",
		bai: [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25, 26, 27, 28,
			29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51
		],
		danhsach: [
			message.author.tag,
			' ' + bot.user.tag
		],
		sansang: [
			bot.user.tag
		],
		p:{
			[message.author.id]:{
				tag: message.author.tag,
				id: message.author.id,
				diem: 0,
				bai: [],
				xong: 0,
			},
			[bot.user.id]:{
				tag: bot.user.tag,
				id: bot.user.id,
				diem: 0,
				bai: [],
				xong: 1,
			}
		}
	}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	//A.T lấy bài
	let bai = bot.bala_data[code].bai;
    bai = shuff.Knuth_Fisher_Yates(bai);
    let tay = bot.bala_data[code].p[bot.user.id].bai;
    let diem = bot.bala_data[code].p[bot.user.id].diem;

    for (i = tay.length; i < 3; i++){
        let random = Math.floor( Math.random() * bai.length );
        tay[i] = bai[random];
        bai.splice(random, 1);
    }  
    diem = functions.tinh_diem(tay);
       
    bot.bala_data[code].bai = bai;
    bot.bala_data[code].p[bot.user.id].diem = diem;
    bot.bala_data[code].p[bot.user.id].bai = tay;
    functions.viet_file(bot);

	//bắt đầu
	let chu = bot.bala_data[code].chu;
    let cuoc = bot.bala_data[code].cuoc;
    let danhsach = bot.bala_data[code].danhsach;
	let sansang = bot.bala_data[code].sansang;
    functions.ba_la(bot, message, code, chu, cuoc, danhsach, sansang, f3);
}

module.exports.tao_phong2 = (bot, message, tiencuocz, f2, f3) => {
	//dữ liệu
	let code = functions.code_phong();

	bot.info[message.author.id].bala.phong = 2;
	bot.info[message.author.id].bala.chu = 1
	bot.info[message.author.id].bala.code = code;
	bot.info[message.author.id].bala.start = 0;
	bot.info[message.author.id].bala.cuoc = tiencuocz;
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.bala_data[code] = {
		chu: message.author.id,
		chu_2: message.author.tag,
		cuoc: tiencuocz,
		msg: ".",
		bai: [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25, 26, 27, 28,
			29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51
		],
		danhsach: [],
		sansang: [],
		p:{
			[message.author.id]:{
				tag: message.author.tag,
				id: message.author.id,
				diem: 0,
				bai: [],
				xong: 0,
			}
		}
	}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});


	//thông báo
	let count = 0;
	let idz = [];
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		count++;
		idz.push(bot.bala_data[code].p[k].id);
	}

	let list = "";
	for (var i = 0; i < idz.length; i++) list += '<@' + idz[i] + '>, ';
	list = list.slice(0, list.length - 2);
	const embed = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + message.author.id + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + count + '\n\n' +
						'Tham gia: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
						'Thoát bàn: `' + bot.config[message.guild.id].prefix + 'bala quit`\n' +
						'Xem bàn: `' + bot.config[message.guild.id].prefix + 'bala table`\n\n' +
						'Đổi tiền cược: `' + bot.config[message.guild.id].prefix + 'bala bet`\n'+
						'Bắt đầu: `' + bot.config[message.guild.id].prefix + 'bala start`\n')
        .addFields(
			{ name: 'Tiền cược', value: tiencuocz + '(VND)' },
			{ name: 'Danh sách người chơi', value: list + '' },
       	)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}

module.exports.ba_la = (bot, message, code, chu, cuoc, danhsach, sansang, f3) => {
	const embed = new MessageEmbed()
		.setColor('#FBFF08')
		.setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + chu + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + danhsach.length + '\n'+
						'Những người chơi có mặt có 60 giây để bốc đủ ba lá bài\n'+
						'hoặc bấm "sẵn sàng" để hệ thống tự động bốc.')
        .addFields(
			{ name: 'Mức cược', value: cuoc + '(VND)' },
			{ name: 'Danh sách người chơi', value: danhsach + '.' },
            { name: 'Đã sẵn sàng', value: sansang + '.' },
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
    message.channel.send({ embeds: [embed], components: [row] })
        .then(msg=>{
			bot.bala_data[msg.id] = {
				code: code,
			}
			bot.bala_data[code].msg = msg.id;
			fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
				if (err) throw err;
			});
			
            setTimeout(function() {
                msg.delete().catch(error => {
                    if (error.code !== 10008 && error.code !== 50013 && error.code !== 0) {
                        console.error('Lỗi nữaaaaa:', error);
                    }
                });
                functions.ba_la_het(bot, message, code);
            }, 60000)
        }).catch(error => {
			if (error.code !== 50013) {
				console.error('Lỗi nữaaaaa:', error);
			}})
}

module.exports.ba_la_het = async (bot, message, code) => {
	if (!bot.bala_data[bot.bala_data[code].msg]) return;
	if (bot.bala_data[bot.bala_data[code].msg].code == 227) return;

	//lấy đủ bài
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		if ((bot.bala_data[code].p[k].bai).length == 3) continue; 

		var baiz = bot.bala_data[code].bai;
    	if (baiz.length == 1){
        	bai2 = [
           	 	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            	11, 12, 13, 14, 15, 16, 17, 18, 19,
            	20, 21, 22, 23, 24, 25, 26, 27, 28,
            	29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            	39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
            	49, 50, 51
        	];
        	bai2.push(baiz[0]);
        	baiz = bai2;
    	}
    	baiz = shuff.Knuth_Fisher_Yates(baiz);
		
    	var tay = bot.bala_data[code].p[k].bai;
    	var diemz = bot.bala_data[code].p[k].diem;

    	for (i = tay.length; i < 3; i++){
        	var random = Math.floor( Math.random() * baiz.length );
        	tay[i] = baiz[random];
        	baiz.splice(random, 1);
    	}  
    	diemz = functions.tinh_diem(tay);
       
    	bot.bala_data[code].bai = baiz;
    	bot.bala_data[code].p[k].diem = diemz;
    	bot.bala_data[code].p[k].bai = tay;
    	functions.viet_file(bot);
    }

	//lấy dữ liệu
	let list = [];
	let diem = [];
	let idz = [];
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		diem.push(bot.bala_data[code].p[k].diem);
		idz.push(bot.bala_data[code].p[k].id);
		list.push([]);	
        list[list.length-1].push('\nTên: `' + bot.bala_data[code].p[k].tag + '`');
		list[list.length-1].push(bot.bala_data[code].p[k].diem);
		list[list.length-1].push(bot.bala_data[code].p[k].bai);
    }

	//chỉnh dữ liệu
	let chu = bot.bala_data[code].chu;
    let cuoc = bot.bala_data[code].cuoc;
    let danhsach = bot.bala_data[code].danhsach;
	let bai = [
		"Át Bích", "2 Bích", "3 Bích", "4 Bích", "5 Bích", "6 Bích", "7 Bích", "8 Bích", "9 Bích", "10 Bích", "J Bích", "Q Bích", "K Bích",
		"Át Chuồn", "2 Chuồn", "3 Chuồn", "4 Chuồn", "5 Chuồn", "6 Chuồn", "7 Chuồn", "8 Chuồn", "9 Chuồn", "10 Chuồn", "J Chuồn", "Q Chuồn", "K Chuồn",
		"Át Rô", "2 Rô", "3 Rô", "4 Rô", "5 Rô", "6 Rô", "7 Rô", "8 Rô", "9 Rô", "10 Rô", "J Rô", "Q Rô", "K Rô",
		"Át Cơ", "2 Cơ", "3 Cơ", "4 Cơ", "5 Cơ", "6 Cơ", "7 Cơ", "8 Cơ", "9 Cơ", "10 Cơ", "J Cơ", "Q Cơ", "K Cơ"
	]

	for (var i = 0; i < list.length; i++){
		if (list[i][1] == 0) list[i][1] = ' Điểm: **Bù**';
		else if (list[i][1] == 227) list[i][1] = ' Điểm: **Ba cào**';
			else list[i][1] = ' Điểm: `' + list[i][1] + '`';
		list[i][2][0] = ' Bài: `[' + bai[list[i][2][0]]; 
		list[i][2][1] = ' ' + bai[list[i][2][1]]; 
		list[i][2][2] = ' ' + bai[list[i][2][2]] + ']`'; 
	}
	
	//tìm người thắng
	let max = Math.max(...diem);
	let min = Math.min(...diem);
	let winner = [];
	let lose = [];
	for (var i = 0; i < diem.length; i++)
		if (diem[i] == max) winner.push(idz[i]);
		else lose.push(idz[i]);
	if (min == 0) min = "**Bù**";
	if (min == 227) min = "**Ba cào**";
	if (max == 0) max = "**Bù**";
	if (max == 227) max = "**Ba cào**";
	
	//tìm kết quả
	let result = "";
	if (winner.length == idz.length) result = 'Hòa! 🤝';
	else{
		for (var i = 0; i < winner.length; i++) result += '<@' + winner[i] + '>, ';
		result = result.slice(0, result.length - 2);
		result += ' thắng! 🥳'
	}
	
	//xuất dữ liệu
	await message.channel.send({ content: 'Dữ liệu ván chơi của <@' + chu + '>\n'+ 'Bàn cược: `' + code + '`\n'+ list}).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
	const embed1 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi')
        .setDescription('Ván chơi của <@' + chu + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + danhsach.length)
        .addFields(
			{ name: 'Tiền cược', value: cuoc + '(VND)' },
			{ name: 'Điểm cao nhất', value: max + '', inline: true },
            { name: 'Điểm thấp nhất', value: min + '', inline: true },
			{ name: 'Kết quả', value: result + '' },
       	)
	await message.channel.send({ embeds: [embed1] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})

	//chỉnh csdl
	let msg = await message.channel.messages.fetch(bot.bala_data[code].msg).catch(error => {
		if (error.code !== 10008 && error.code !== 0) {
			console.error('Lỗi nữaaaaa:', error);
		}
	});
	
	if (msg)
	msg.delete().catch(error => {
		if (error.code !== 10008 && error.code !== 50013 && error.code !== 0) {
			console.error('Lỗi nữaaaaa:', error);
		}
	});

	const embed2 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Cảm ơn bạn <@' + lose[0] + '> vì đã tham gia. Chúc bạn may mắn lần sau nhé! 🍀')
	const embed3 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Cảm ơn bạn <@' + winner[0] + '> vì đã tham gia. Bạn thật là một người may mắn! 🥳')
	const embed4 = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi với A.T')
        .setDescription('Cảm ơn bạn <@' + winner[0] + '> vì đã tham gia. Quả là một trận đấu tuyệt vời! 😄')
	let tongcuoc = functions.tach_tien(cuoc, 0) * (idz.length - winner.length);
	let nhancuoc = (tongcuoc / winner.length).toFixed();
	nhancuoc = functions.ghep_tien(nhancuoc, '');
	let trucuoc = cuoc;

	var winu;
	if (winner.length == idz.length) winu = 0;
	else winu = 1;

	let van_dau_bot = 0;
	for (var i = 0; i < winner.length; i++){
		if (winner[i] == bot.user.id){
			if (result === 'Hòa! 🤝') message.channel.send({ embeds: [embed4] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
			else message.channel.send({ embeds: [embed2] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
			van_dau_bot = 1;
			continue;
		}
		var tien = functions.them_tien(bot.info[winner[i]].bala.tien, nhancuoc, "cong");
		for (var j = 0; j < idz.length; j++)
			if (idz[j] == winner[i]){
				var diemz = diem[j];
				break;
			}
		functions.cap_nhat(bot, tien, diemz, winner[i], winu);
	}

	winu = 0;

	for (var i = 0; i < lose.length; i++){
		if (lose[i] == bot.user.id){
			message.channel.send({ embeds: [embed3] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
				}})
			van_dau_bot = 1;
			continue;
		}
		var tien = functions.them_tien(bot.info[lose[i]].bala.tien, trucuoc, "tru");
		for (var j = 0; j < idz.length; j++)
			if (idz[j] == lose[i]){
				var diemz = diem[j];
				break;
			}
		functions.cap_nhat(bot, tien, diemz, lose[i], winu);
	}

	//chỉnh lại phòng
	bot.bala_data[bot.bala_data[code].msg].code = 227;
	bot.bala_data[code].msg = ".";
	bot.bala_data[code].bai = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25, 26, 27, 28,
			29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
			49, 50, 51
		];
	bot.bala_data[code].danhsach = [];
	bot.bala_data[code].sansang = [];
	for (let i in bot.bala_data[code].p){
		bot.bala_data[code].p[i].diem = 0;
		bot.bala_data[code].p[i].bai = [];
		bot.bala_data[code].p[i].xong = 0;
	}
	fs.writeFileSync("./data/bala.json", JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});
	
	//thông báo
	if (van_dau_bot == 0){
		let count = 0;
		let idz = [];
		for(var k in bot.bala_data[code].p){
			if (!bot.bala_data[code].p[k].tag) continue;
			count++;
			idz.push(bot.bala_data[code].p[k].id);
		}

		let list = "";
		for (var i = 0; i < idz.length; i++) list += '<@' + idz[i] + '>, ';
		list = list.slice(0, list.length - 2);
		const embed = new MessageEmbed()
			.setColor('#FBFF08')
			.setTitle('Ba lá - chơi nhiều người')
			.setDescription('Ván chơi của <@' + bot.bala_data[code].chu + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + count + '\n\n' +
						'Tham gia: `' + bot.config[message.guild.id].prefix + 'bala join @' + bot.bala_data[code].chu_2 + '`\n'+
						'Thoát bàn: `' + bot.config[message.guild.id].prefix + 'bala quit`\n' +
						'Xem bàn: `' + bot.config[message.guild.id].prefix + 'bala table`\n\n' +
						'Đổi tiền cược: `' + bot.config[message.guild.id].prefix + 'bala bet`\n'+
						'Bắt đầu: `' + bot.config[message.guild.id].prefix + 'bala start`\n')
			.addFields(
				{ name: 'Tiền cược', value: bot.bala_data[code].cuoc + '(VND)' },
				{ name: 'Danh sách người chơi', value: list + '' },
			)
		setTimeout(function() {
			message.channel.send({ embeds: [embed] }).catch(error => {
				if (error.code !== 50013) {
					console.error('Lỗi nữaaaaa:', error);
			}})
        }, 9000)
	}
}

module.exports.bat_dau = (bot, message, f2, f3) => {
	let danhsach = [];
	let code = bot.info[message.author.id].bala.code;

	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		bot.info[k].bala.start = 1;
		danhsach.push(' ' + bot.bala_data[code].p[k].tag);
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.bala_data[code].danhsach = danhsach;
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	let chu = bot.bala_data[code].chu;
    let cuoc = bot.bala_data[code].cuoc;
	let sansang = bot.bala_data[code].sansang;
	functions.ba_la(bot, message, code, chu, cuoc, danhsach, sansang, f3);
}

module.exports.cap_nhat = (bot, tien, diem, p, thang) => {
	let bacao = 0;
	let bu = 0
	if (diem == 227) bacao = 1;
	if (diem == 0) bu = 1;

	bot.info[p].bala.tien = tien;
	bot.info[p].bala.choi += 1;
	bot.info[p].bala.cthang += thang;
	bot.info[p].bala.ba_cao += bacao;
	bot.info[p].bala.bu += bu;
	bot.info[p].bala.start = 0;

	if (thang == 1){
		bot.info[p].bala.streak2 += 1;
		if (bot.info[p].bala.streak1 < bot.info[p].bala.streak2) bot.info[p].bala.streak1 = bot.info[p].bala.streak2;
	}
	else{
		if (bot.info[p].bala.streak1 < bot.info[p].bala.streak2) bot.info[p].bala.streak1 = bot.info[p].bala.streak2;
		bot.info[p].bala.streak2 = 0;
	}
	fs.writeFileSync("./data/user.json", JSON.stringify(bot.info, null, 4), err => {
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

module.exports.tach_tien = (a, b) => {
	var bac = 0;
	if (a[a.length - 1].toLowerCase() === 'k') var bac = 3;
	if (a[a.length - 1].toLowerCase() === 'm') var bac = 6;
	if (a[a.length - 1].toLowerCase() === 'b') var bac = 9;
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
	
	array = shuff.Knuth_Fisher_Yates(array)
	for (let i = 1; i <= 5; i ++)
		code += array[Math.floor( Math.random() * array.length )];
	return code;
}

module.exports.xoa_phong = (bot, message, f2, f3) => {
	let code = bot.info[message.author.id].bala.code;
	 
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		bot.info[k].bala.phong = 0;
		bot.info[k].bala.chu = 0;
		bot.info[k].bala.code = ".";
		bot.info[k].bala.start = 0;
		bot.info[k].bala.cuoc = ".";
	}
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	bot.bala_data[code] = {}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	const embed = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + message.author.id + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Bàn cược đã bị đóng!')
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}

module.exports.thoat_phong = (bot, message, f2, f3) => {
	if (bot.info[message.author.id].bala.chu == 1){
		functions.xoa_phong(bot, message, f2, f3);
		return;
	}
	bot.bala_data[bot.info[message.author.id].bala.code].p[message.author.id] = {}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	bot.info[message.author.id].bala.phong = 0;
	bot.info[message.author.id].bala.code = ".";
	bot.info[message.author.id].bala.start = 0;
	bot.info[message.author.id].bala.cuoc = ".";
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});
}

module.exports.tham_gia_phong = (bot, message, mention, f2, f3) => {
	bot.info[message.author.id].bala.phong = 2;
	bot.info[message.author.id].bala.code = bot.info[mention.id].bala.code;
	bot.info[message.author.id].bala.start = 0;
	bot.info[message.author.id].bala.cuoc = bot.info[mention.id].bala.cuoc;
	fs.writeFileSync(f2, JSON.stringify(bot.info, null, 4), err => {
		if (err) throw err;
	});

	let code = bot.info[message.author.id].bala.code;
	let cuoc = bot.info[message.author.id].bala.cuoc;
	bot.bala_data[code].p[message.author.id] = {
		tag: message.author.tag,
		id: message.author.id,
		diem: 0,
		bai: [],
		xong: 0,
	}
	fs.writeFileSync(f3, JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});

	let count = 0;
	let idz = [];
	for(var k in bot.bala_data[code].p){
		if (!bot.bala_data[code].p[k].tag) continue;
		count++;
		idz.push(bot.bala_data[code].p[k].id);
	}

	let list = "";
	for (var i = 0; i < idz.length; i++) list += '<@' + idz[i] + '>, ';
	list = list.slice(0, list.length - 2);
	const embed = new MessageEmbed()
        .setColor('#FBFF08')
        .setTitle('Ba lá - chơi nhiều người')
        .setDescription('Ván chơi của <@' + message.author.id + '>\n'+
						'Bàn cược: `' + code + '`\n'+
						'Số lượng người chơi: ' + count + '\n\n' +
						'Tham gia: `' + bot.config[message.guild.id].prefix + 'bala join @' + message.author.tag + '`\n'+
						'Thoát bàn: `' + bot.config[message.guild.id].prefix + 'bala quit`\n' +
						'Xem bàn: `' + bot.config[message.guild.id].prefix + 'bala table`\n\n' +
						'Đổi tiền cược: `' + bot.config[message.guild.id].prefix + 'bala bet`\n'+
						'Bắt đầu: `' + bot.config[message.guild.id].prefix + 'bala start`\n')
        .addFields(
			{ name: 'Tiền cược', value: cuoc + '(VND)' },
			{ name: 'Danh sách người chơi', value: list + '' },
       	)
	message.channel.send({ embeds: [embed] }).catch(error => {
		if (error.code !== 50013) {
			console.error('Lỗi nữaaaaa:', error);
		}})
}

module.exports.viet_file = (bot) => {
	fs.writeFile("./data/bala.json", JSON.stringify(bot.bala_data, null, 4), err => {
		if (err) throw err;
	});
}