import Database from './Database'

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author")));
console.log(JSON.stringify(database.execute("select id, name, age from author where id = 1")));
console.log(JSON.stringify(database.execute("select id, name, age from author where age < 60")));
console.log(JSON.stringify(database.execute("select id, name, age from author where name = Linus Torvalds")));