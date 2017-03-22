class Database {
	constructor(name) {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		if (statement.startsWith("create table")) return this.createTable(statement);
		if (statement.startsWith("insert")) return this.insert(statement);
		if (statement.startsWith("select")) return this.select(statement);
		if (statement.startsWith("update")) return this.update(statement);
	}

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
	}

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
					case "required":
						if (!(column in row)) throw `A coluna ${column} é requerida`;
				}
			}
		}
		this.tables[tableName].data.push(row);
	}

	select(statement) {
		let parsedStatement = statement.match(/select (.*) from (.*)/);
		let [undefined, columns, tableName] = parsedStatement;
		columns = columns.split(",");
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		var results = [];
		for(let row of this.tables[tableName].data) {
			var result = {};
			for(let column of columns) {
				column = column.trim();
				if (!(column in this.tables[tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			results.push(result);
		}
		return results;
	}

	update(statement) {
		let parsedStatement = statement.match(/update (.*) set (.*)/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.split(",");
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		for(let row of this.tables[tableName].data) {
			for(let column of columns) {
				let parsedColumn = column.split("=");
				let [columnName, columnValue] = parsedColumn;
				columnName = columnName.trim();
				columnValue = columnValue.trim();
				if (!(columnName in this.tables[tableName].columns)) throw `A coluna ${columnName} não existe`;
				row[columnName] = columnValue;
			}
		}
	}
};

let database = new Database();

database.execute("create table author (id number autoincrement, name string, age number, city string, state string, country string)");
database.execute("insert into author (name, age) values (Douglas Crockford, 62)");
database.execute("insert into author (name, age) values (Linus Torvalds, 47)");
let resultsBeforeUpdate = database.execute("select id, name, age from author");
console.log(JSON.stringify(resultsBeforeUpdate));
database.execute("update author set name = Martin Fowler, age = 57");
let resultsAfterUpdate = database.execute("select name, age from author");
console.log(JSON.stringify(resultsAfterUpdate));




