let database = {
	tables: {},
	execute: function (statement) {
		if (statement.startsWith("create table")) return this.createTable(statement);
		if (statement.startsWith("insert")) return this.insert(statement);
	},
	createTable: function (statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let tableName = parsedStatement[1];
		let columns = parsedStatement[2];
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = {
			columns: {},
			data: []
		};
		for(let column of columns) {
			column = column.trim();
			let parsedField = column.split(" ");
			let columnName = parsedField[0];
			let columnType = parsedField[1];
			this.tables[tableName].columns[columnName] = columnType;
		}
		return true;
	},
	insert: function (statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let tableName = parsedStatement[1];
		let columns = parsedStatement[2];
		columns = columns.replace(/(\(|\))/g, "").split(",");
		let valuesInsert = parsedStatement[3];
		valuesInsert = valuesInsert.replace(/(\(|\))/g, "").split(",");

		let row = {};
		for(let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = valuesInsert[i].trim();
		}
		this.tables[tableName].data.push(row);
		return true;
	}
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");

console.log(JSON.stringify(database));