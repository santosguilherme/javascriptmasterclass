import Database from './core/Database';

let database = new Database();

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
console.log(database.execute("select id, name, age from author"));
database.execute("update author set name = Martin Fowler, age = 57");
console.log(database.execute("select id, name, age from author"));