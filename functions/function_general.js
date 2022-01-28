const functions = require("./function_general.js");
const fs = require("fs");

//do stuff
module.exports.sortz = (array) => {
	if (array.length < 2) {
		return array;
	}

	var pivot = []
	var left = []; 
	var right = [];
	pivot[0] = array[0];
	
	for (var i = 1; i < array.length; i++) {
		array[i][0] > pivot[0][0] ? left.push(array[i]) : right.push(array[i]);
	}
	
	return (functions.sortz(left)).concat(pivot, functions.sortz(right)) ;
}

module.exports.Knuth_Fisher_Yates = ( myArray ) => {
	let i = myArray.length;
	if ( i == 0 ) return;
	while ( --i ) {
	   let j = Math.floor( Math.random() * ( i + 1 ) );
	   [ myArray[i], myArray[j] ] = [ myArray[j], myArray[i] ];
	}
	return myArray;
}

//guild
module.exports.set_default = (bot, guild, guild_id, f) => {
	bot.config[guild_id] = {
		name: guild,
		prefix: "&",
		channel: " ",
		temp: [".", ".", ".", "."],
		botz: [""],
		botS: [""],
		userz: [""],
		userS: [""],
	}
	fs.writeFileSync(f, JSON.stringify(bot.config, null, 4), err => {
		if (err) throw err;
	});
}