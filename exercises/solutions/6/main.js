class Table {
	constructor() {
		this.columns = {};
		this.data = [];
	}

	getData(clauses) {
		let rows = this.data;
		rows = rows.filter(row => {
			let ok = true;
			for(let column in row) {
				for (let clause of clauses) {
					if (column !== clause.column) continue;
					switch (clause.operator) {
						case "=":
							if (!(row[column] == clause.value)) ok = false;
							break;
						case ">":
							if (!(row[column] > clause.value)) ok = false;
							break;
						case "<":
							if (!(row[column] < clause.value)) ok = false;
							break;
					}
					if (!ok) break;
				}
			}
			return ok;
		});
		return rows;
	}
}

class Database {
	constructor(name = "New Database") {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		let [,init] = statement.match(/([a-z]+)/);
		return this[init](statement);
	}

	create(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = new Table();
		for(let column of columns) {
			let [name, type] = column.trim().split(" ");
			this.tables[tableName].columns[name] = type;
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
		this.tables[tableName].data.push(row);
	}

	select(statement) {
		let parsedStatement = statement.match(/select (.*) from ([a-z]+)(?: where (.*))?/);
		let [undefined, columns, tableName, clauses] = parsedStatement;
		columns = columns.split(",");
		clauses = (clauses) ? clauses.split("and") : [];
		
		let clausesArray = [];
		for(let clause of clauses) {
			let[column, operator, value] = clause.split(/(>|<|\=)/);
			clausesArray.push({column: column.trim(), operator, value: value.trim()});
		}
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		var results = [];
		for(let row of this.tables[tableName].getData(clausesArray)) {
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
};

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author")));
console.log(JSON.stringify(database.execute("select id, name, age from author where id = 1")));
console.log(JSON.stringify(database.execute("select id, name, age from author where age < 60")));
console.log(JSON.stringify(database.execute("select id, name, age from author where name = Linus Torvalds")));




