let statement = "create table author (id number, name string, age number, city string, state string, country string)";
let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
let tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.replace(/(\(|\))/g, "").split(",");
console.log(tableName, columns);