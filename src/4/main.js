let Database = function () {
	var tables = {};

	this.execute = function (statement) {
		if (statement.startsWith("create table")) return createTable(statement);
		if (statement.startsWith("insert")) return insert(statement);
		if (statement.startsWith("select")) return select(statement);
	}

	function createTable(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let tableName = parsedStatement[1];
		let columns = parsedStatement[2];
		columns = columns.replace(/(\(|\))/g, "").split(",");
		tables[tableName] = {
			columns: {},
			data: []
		};
		for(let column of columns) {
			column = column.trim();
			let parsedField = column.split(" ");
			let columnName = parsedField[0];
			let columnType = parsedField[1];
			tables[tableName].columns[columnName] = columnType;
		}
		return true;
	}

	function insert(statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let tableName = parsedStatement[1];
		if (!(tableName in tables)) throw `A tabela ${tableName} não existe`;
		let columns = parsedStatement[2];
		columns = columns.replace(/(\(|\))/g, "").split(",");
		let valuesInsert = parsedStatement[3];
		valuesInsert = valuesInsert.replace(/(\(|\))/g, "").split(",");

		let row = {};
		for(let i = 0; i < columns.length; i++) {
			let column = columns[i].trim();
			if (!(column in tables[tableName].columns)) throw `A coluna ${column} não existe`;
			let value = valuesInsert[i].trim()
			row[column] = value;
		}
		tables[tableName].data.push(row);
		return true;
	}

	function select(statement) {
		let parsedStatement = statement.match(/select (.*) from (.*)/);
		let columns = parsedStatement[1].split(",");
		let tableName = parsedStatement[2];
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
let results = database.execute("select name, age from author");
console.log(JSON.stringify(results));