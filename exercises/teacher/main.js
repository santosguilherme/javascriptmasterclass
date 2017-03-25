let statement = "create table author (id number, name string, city string, state string, country string)";

let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
let parts = statement.match(exp);
let tableName = parts[1];
let columns = parts[2];
columns = columns.split(/,\s/);

let database = {
	tables: {
		[tableName]: {
			columns: {},
			data: []
		}
	}
};

Object.defineProperty(database, 'tables', {
	enumerable: true,
	writable: false,
	configurable: false
});

for(let column of columns) {
	let parts = column.split(" ");
	Object.assign(database.tables[tableName].columns, {[parts[0]]: parts[1]});
}

delete database.tables;
console.log(JSON.stringify(database));


















