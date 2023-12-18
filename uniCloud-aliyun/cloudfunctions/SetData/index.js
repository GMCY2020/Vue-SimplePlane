'use strict';


const db = uniCloud.database();
const dbCmd = db.command;
const rd = db.collection("RichDaily");

exports.main = async (events, context) => {
	
	let event =  events.queryStringParameters
	
	// let res = await rd.where({
	// 	_id: dbCmd.eq(event._id)
	// }).set({
	// 	data: JSON.parse(event.data)
	// });
	
	// let res = await rd.doc(event._id).set({
	// 	data: JSON.parse(event.data)
	// })
	
	let res = await rd.doc(event._id).set({
		user_id: event.user_id,
		user_name: event.user_name,
		user_password: event.user_password,
		data: JSON.parse(event.data)
	})
	
	return res
};
