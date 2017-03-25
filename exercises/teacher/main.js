let database = {
	tables: {},
	createTable(statement) {
		let exp = /create table ([a-z]+) \(([a-z\s,]+)\)/;
		let [,tableName,columns] = statement.match(exp);
		columns = columns.split(/,\s/);

		this.tables[tableName] = {
			columns: {},
			data: []
		}

		for(let column of columns) {
			let parts = column.split(" ");
			Object.assign(this.tables[tableName].columns, {[parts[0]]: parts[1]});
		}
	},
	insert(statement) {
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
		this.tables[tableName].data.push(obj);
	},
	execute(statement) {
		if (statement.startsWith("create")) return this.createTable(statement);
		if (statement.startsWith("insert")) return this.insert(statement);
	}
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
console.log(JSON.stringify(database, null, 2));


















