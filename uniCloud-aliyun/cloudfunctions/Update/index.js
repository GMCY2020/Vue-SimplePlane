'use strict';

// const { METHODS } = require("http");

const db = uniCloud.database(); //代码块为cdb
const dbCmd = db.command;
const rd = db.collection("RichDaily");

exports.main = async (events, context) => {
	let event =  events.queryStringParameters
	
	// delData(event)
	
	let res = await rd.where({
		_id: dbCmd.eq(event._id)
	}).update({
		data: JSON.parse(event.data)
	});
	
	return res
};
