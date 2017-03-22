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
			let [name, type, ...options] = column.trim().split(" ");
			tables[tableName].columns[name] = {type, options};
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
		for(let column in tables[tableName].columns) {
			for(let option of tables[tableName].columns[column].options) {
				switch (option) {
					case "autoincrement":
						tables[tableName].columns[column].sequence = tables[tableName].columns[column].sequence || 1;
						row[column] = tables[tableName].columns[column].sequence++;
						break;
					case "required":
						if (!(column in row)) throw `A coluna ${column} é requerida`;
				}
			}
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

database.execute("create table author (id number autoincrement, name string required, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
database.execute("insert into author (name, age) values (Martin Fowler, 54)");
let results = database.execute("select id, name, age from author");
console.log(JSON.stringify(results));