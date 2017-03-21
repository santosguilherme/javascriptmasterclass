import Database from './Database';

let database = new Database();

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
let results = database.execute("select name, age from author");
console.log(JSON.stringify(results));