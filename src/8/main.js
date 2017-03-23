import Database from './core/Database';

let database = new Database();

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)").then(function () {
	database.execute("insert into author (name, age) values (Douglas Crockford, 62)").then(function () {
		database.execute("select id, name, age from author where id = 1").then(function (result) {
			console.log(result);
		}).catch(function (e) {
			console.log(e);
		});
	});
});
