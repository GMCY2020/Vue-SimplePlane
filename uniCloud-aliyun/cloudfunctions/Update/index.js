'use strict';

const db = uniCloud.database();
const dbCmd = db.command;
const rd = db.collection("RichDaily");

exports.main = async (events, context) => {
	let event =  events.queryStringParameters
	
	let res = await rd.where({
		_id: dbCmd.eq(event._id)
	}).update({
		data: JSON.parse(event.data)
	});
	
	return res
};
