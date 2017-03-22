import Database from './core/Database';

let database = new Database();

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
console.log(database.execute("select id, name, age from author"));
database.execute("update author set name = Martin Fowler, age = 57");
console.log(database.execute("select id, name, age from author"));