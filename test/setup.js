var r = require('rethinkdb'),
	async = require('async');

function final(err) {
	if (err) {
		throw new Error(err);
	}
}
async.waterfall([
	function (next) {
		r.connect({
			host: 'localhost',
			port: 28015,
			db: 'test'
		}, next);
	},
	function (conn, next) {
		r.tableCreate('post').run(conn, next);
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "post" table');
		} else {
			r.tableCreate('comment').run(conn, next);
		}
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "comment" table');
		} else {
			r.tableCreate('user').run(conn, next);
		}
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "user" table');
		}
	}
], final);