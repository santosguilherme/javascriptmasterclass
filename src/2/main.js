let statement = "create table author (id number, name string, age number, city string, state string, country string)";
let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
let [undefined, tableName, columns] = parsedStatement;
columns = columns.replace(/(\(|\))/g, "").split(",");

let database = {
	tables: {}
};

database.tables[tableName] = {
	columns: {},
	data: []
};

for(let column of columns) {
	let [name, type] = column.trim().split(" ");
	database.tables[tableName].columns[name] = type;
}

console.log(JSON.stringify(database));