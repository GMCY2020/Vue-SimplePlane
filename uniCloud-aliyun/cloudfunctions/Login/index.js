'use strict';

const { log } = require("console");

const db = uniCloud.database(); //代码块为cdb
const dbCmd = db.command;
const rd = db.collection("RichDaily");

exports.main = async (events, context) => {
	let event =  events.queryStringParameters

	let res = await rd.where({
		user_id: dbCmd.eq(event.user_id)
	}).get()
	
	if (res.affectedDocs === 1) {
		if (res.data[0]["user_password"] === event.user_password) {
			return res.data[0];
		}
	}
	
	return "err";
};
