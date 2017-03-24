let Database = function () {
	var tables = {};

	this.execute = function (statement) {
		if (statement.startsWith("create table")) return createTable(statement);
		if (statement.startsWith("insert")) return insert(statement);
		if (statement.startsWith("select")) return select(statement);
	}

	function createTable(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		tables[tableName] = {
			columns: {},
			data: []
		};
		for(let column of columns) {
			let [name, type] = column.trim().split(" ");
			tables[tableName].columns[name] = type;
		}
	}

	function insert(statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		let row = {};
		for(let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = values[i].trim();
		}
		tables[tableName].data.push(row);
	}

	function select(statement) {
		let parsedStatement = statement.match(/select (.*) from (.*)/);
		let [undefined, columns, tableName] = parsedStatement;
		columns = columns.split(",");
		if (!(tableName in tables)) throw `A tabela ${tableName} não existe`;
		var results = [];
		for(let row of tables[tableName].data) {
			var result = {};
			for(let column of columns) {
				column = column.trim();
				if (!(column in tables[tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			results.push(result);
		}
		return results;
	}
};

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
let results = database.execute("select id, name, age from author");
console.log(JSON.stringify(results));