'use strict';

const db = uniCloud.database()
const rd = db.collection("RichDaily");

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
	
	let res = 'err';
	
	if (UserAdd) {
		res = user_id
	}
	
	return res
};
 
