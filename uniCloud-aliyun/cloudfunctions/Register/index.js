'use strict';

const db = uniCloud.database()
// const dbCmd = db.command;
const rd = db.collection("RichDaily");
// const rds = db.collection("RichDailySet");

exports.main = async (events, context) => {
	let event =  events.queryStringParameters
	
	let resRD = await rd.get()
	
	let resRdCounts = resRD.affectedDocs + 1
	
	let endId = resRdCounts.toString()
	
	let user_id = "1"
	
	for (let i=0; i < (6 - endId.length); i++) {
		user_id += "0"
	}
	
	user_id += endId
	
	let UserAdd = await rd.add({
		user_id,
		user_name: event.user_name,
		user_password: event.user_password,
		dataTime: Date.now(),
		data: JSON.parse(event.data)
	})
	
	// return UserAdd
	
	let res = 'err';
	
	// if (UserAdd.errMsg === "request:ok) {
	// 	res = user_id
	// }
	// else {
	// 	res = "err"
	// }
	if (UserAdd) {
		res = user_id
	}
	
	return res
};
 
