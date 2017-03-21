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

console.log(JSON.stringify(database));