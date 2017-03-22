let database = {
	tables: {},
	execute(statement) {
		if (statement.startsWith("create table")) return this.createTable(statement);
		if (statement.startsWith("insert")) return this.insert(statement);
	},
	createTable(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = {
			columns: {},
			data: []
		};
		for(let column of columns) {
			let [name, type, ...options] = column.trim().split(" ");
			this.tables[tableName].columns[name] = {type, options};
		}
	},
	insert(statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		let row = {};
		for(let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = values[i].trim();
		}
		for(let column in this.tables[tableName].columns) {
			for(let option of this.tables[tableName].columns[column].options) {
				switch (option) {
					case "autoincrement":
						this.tables[tableName].columns[column].sequence = this.tables[tableName].columns[column].sequence || 1;
						row[column] = this.tables[tableName].columns[column].sequence++;
						break;
				}
			}
		}
		this.tables[tableName].data.push(row);
	}
};

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");

console.log(JSON.stringify(database));