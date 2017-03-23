import Database from './core/Database';

let database = new Database();

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
database.execute("insert into author (name, age) values (Martin Fowler, 54)");
console.log(database.execute("select id, name, age from author"));
console.log(database.execute("select id, name, age from author where id = 1"));
console.log(database.execute("select id, name, age from author where age < 60"));
console.log(database.execute("select id, name, age from author where age > 50 and age < 60"));