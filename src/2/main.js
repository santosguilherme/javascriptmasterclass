let statement = "create table author (id number, name string, age number, city string, state string, country string)";
let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
let tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.replace(/(\(|\))/g, "").split(",");

let database = {
	tables: {}
};

Object.defineProperty(database, 'tables', {
	writable: false,
	configurable: false
});

database.tables[tableName] = {
	columns: {},
	data: []
};

for(let column of columns) {
	let parts = column.trim().split(" ");
	let name = parts[0];
	let type = parts[1];
	database.tables[tableName].columns[name] = type;
}

console.log(JSON.stringify(database));