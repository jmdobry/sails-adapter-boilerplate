var r = require('rethinkdb'),
	async = require('async');

function after(err) {
	if (err) {
		throw new Error(err);
	}
}
async.waterfall([
	function (next) {
		console.log('Connecting to test database');
		r.connect({
			host: '127.0.0.1',
			port: 28015,
			db: 'test'
		}, next);
	},
	function (conn, next) {
		console.log('Connected to test database');
		console.log('Creating test tables');
		r.tableCreate('post').run(conn, next);
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "post" table');
		} else {
			console.log(result);
			r.tableCreate('comment').run(conn, next);
		}
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "comment" table');
		} else {
			console.log(result);
			r.tableCreate('user').run(conn, next);
		}
	},
	function (result, next) {
		if (result.created === 0) {
			next('Failed to create "user" table');
		} else {
			console.log(result);
		}
	}
], after);