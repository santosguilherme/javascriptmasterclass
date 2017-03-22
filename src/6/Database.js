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
		if (statement.startsWith("delete")) return this.delete(statement);
	}

	createTable(statement) {
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
	}

	insert(statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let tableName = parsedStatement[1];
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		let columns = parsedStatement[2];
		columns = columns.replace(/(\(|\))/g, "").split(",");
		let valuesInsert = parsedStatement[3];
		valuesInsert = valuesInsert.replace(/(\(|\))/g, "").split(",");

		let row = {};
		for(let i = 0; i < columns.length; i++) {
			let column = columns[i].trim();
			if (!(column in this.tables[tableName].columns)) throw `A coluna ${column} não existe`;
			let value = valuesInsert[i].trim()
			row[column] = value;
		}
		this.tables[tableName].data.push(row);
		return true;
	}

	select(statement) {
		let parsedStatement = statement.match(/select (.*) from (.*)/);
		let columns = parsedStatement[1].split(",");
		let tableName = parsedStatement[2];
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
		let tableName = parsedStatement[1];
		let columns = parsedStatement[2].split(",");
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		for(let row of this.tables[tableName].data) {
			for(let column of columns) {
				let parsedColumn = column.split("=");
				let columnName = parsedColumn[0].trim();
				if (!(columnName in this.tables[tableName].columns)) throw `A coluna ${columnName} não existe`;
				let columnValue = parsedColumn[1].trim();
				row[columnName] = columnValue;
			}
		}
	}

	delete(statement) {
		let parsedStatement = statement.match(/delete from (.*)/);
		let tableName = parsedStatement[1];
		this.tables[tableName].data = [];
	}
};