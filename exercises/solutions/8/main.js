import Database from './core/Database';
import co from './lib/co';

let database = new Database();

database.execute("create table author (id number, name string, age number, city string, state string, country string)").then(function () {
	database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)").then(function () {
		database.execute("select id, name, age from author where id = 1").then(function (result) {
			console.log(result);
		}).catch(function (e) {
			console.log(e);
		});
	});
});

co(function* () {
	yield database.execute("create table author (id number, name string, age number, city string, state string, country string)");
	yield database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
	let result = yield database.execute("select id, name, age from author where id = 1");
	console.log(result);
});