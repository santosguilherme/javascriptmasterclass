export default class Database {
	constructor(name = "New Database") {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		let [,init] = statement.match(/([a-z]+)/);
		var that = this;
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				try {
					let result = that[init](statement);	
					resolve(result);
				} catch (e) {
					reject(e);
				}
			}, Math.floor(Math.random() * 1000));
		});
		
	}

	getData(tableName, clauses) {
		let rows = this.tables[tableName].data;
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

	create(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = {
			columns: {},
			data: []
		};
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
		for(let row of this.getData(tableName, clausesArray)) {
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