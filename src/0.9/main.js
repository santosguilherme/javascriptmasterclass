let statement = "create table author (id number, name string, age number, city string, state string, country string)";
let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
let tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.replace(/(\(|\))/g, "").split(",");

let database = {
	tables: {}
};

database.tables[tableName] = {
	columns: {},
	data: []
};

for(let column of columns) {
	column = column.trim();
	let parsedField = column.split(" ");
	let columnName = parsedField[0];
	let columnType = parsedField[1];
	database.tables[tableName].columns[columnName] = columnType;
}

let insert = "insert into author (name, age) values (Douglas Crockford, 62)";
let parsedInsert = insert.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
let tableNameInsert = parsedInsert[1];
let columnsInsert = parsedInsert[2];
columnsInsert = columnsInsert.replace(/(\(|\))/g, "").split(",");
let valuesInsert = parsedInsert[3];
valuesInsert = valuesInsert.replace(/(\(|\))/g, "").split(",");

let row = {};
for(let i = 0; i < columnsInsert.length; i++) {
	row[columnsInsert[i]] = valuesInsert[i];
}
database.tables[tableName].data.push(row);

console.log(JSON.stringify(database));