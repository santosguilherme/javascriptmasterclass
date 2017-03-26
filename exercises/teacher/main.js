let Database = function () {
	let tables = {};
	let createTable = function (statement) {
		let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
		let [,tableName,columns] = statement.match(exp);
		columns = columns.split(/,\s/);

		tables[tableName] = {
			columns: {},
			data: []
		}

		for(let column of columns) {
			let parts = column.split(" ");
			Object.assign(tables[tableName].columns, {[parts[0]]: parts[1]});
		}
	};
	let insert = function(statement) {
		let exp = /insert into ([a-z]+) \(([a-z\s,]+)\) values \(([a-zA-Z0-9\s,]+)\)/;
		let [,tableName, columns, values] = statement.match(exp);
		columns = columns.split(/,\s/);
		values = values.split(/,\s/);
		let obj = {};
		for(let i = 0; i < columns.length; i++) {
			Object.assign(obj, {
				[columns[i]]: values[i]
			});
		}
		tables[tableName].data.push(obj);
	};
	let select = function (statement) {
		let exp = /select ([a-z\s,]+) from ([a-z]+)/;
		let [,columns, tableName] = statement.match(exp);
		columns = columns.split(/,\s/);
		if (!(tableName in tables)) throw `A tabela ${tableName} não existe`;
		{columns, tableName};
		let result = [];
		for(let row of tables[tableName].data) {
			var obj = {};
			for(let column of columns) {
				Object.assign(obj, {[column]: row[column]});
			}
			result.push(obj);
		}
		return result;
	};
	this.execute = function (statement) {
		if (statement.startsWith("create")) return createTable(statement);
		if (statement.startsWith("insert")) return insert(statement);
		if (statement.startsWith("select")) return select(statement);
	}
};

var database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
try {
	console.log(database.execute("select id, name, age from authorr"));
} catch(e) {
	console.log(e);
}
delete database.tables;
console.log(database.execute("select name, age from author"));
















