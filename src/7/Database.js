export default class Database {
	constructor(name) {
		this.name = name;
		this.tables = {};
	}

	execute(statement) {
		if (statement.startsWith("create table")) return this.createTable(statement);
		if (statement.startsWith("insert")) return this.insert(statement);
		if (statement.startsWith("select")) return this.select(statement);
		if (statement.startsWith("update")) return this.update(statement);
		if (statement.startsWith("truncate")) return this.truncate(statement);
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
		let parsedStatement = statement.match(/select (.*) from (.*) where (.*)/);
		let [undefined, columns, tableName, clauses] = parsedStatement;
		columns = columns.split(",");
		clauses = clauses.split("and");
		let clausesIndex = {};
		clauses.forEach(clause => {
			let [column, value] = clause.split("=")
			column = column.trim();
			value = value.trim();
			return clausesIndex[column] = value;
		});
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		let rows = this.tables[tableName].data;
		rows = rows.filter(row => {
			let ok = true;
			for(let column in row) {
				if (column in clausesIndex && row[column] != clausesIndex[column]) {
					ok = false;
					break;
				}
			}
			return ok;
		});
		let results = rows.map(row => {
			var result = {};
			for(let column of columns) {
				column = column.trim();
				if (!(column in this.tables[tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			return result;
		});
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

	truncate(statement) {
		let parsedStatement = statement.match(/truncate table (.*)/);
		let [undefined, tableName] = parsedStatement;
		this.tables[tableName].data = [];
		for(let column in this.tables[tableName].columns) {
			for(let option of this.tables[tableName].columns[column].options) {
				if (option === "autoincrement") this.tables[tableName].columns[column].sequence = 1;
			}
		}
	}
};