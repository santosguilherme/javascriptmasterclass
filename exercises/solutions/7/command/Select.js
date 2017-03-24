import Command from "./Command"

export default class Select extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/select (.*) from (\w+)(?: where (.*))?/);
		let [undefined, columns, tableName, clauses] = parsedStatement;
		columns = columns.split(",");
		clauses = (clauses) ? clauses.split("and") : [];
		let clausesIndex = [];
		clauses.forEach(clause => {
			let [operator] = clause.match(/(<|>|\=)/);
			let [column, value] = clause.split(operator);
			column = column.trim();
			value = value.trim();
			clausesIndex.push({column, value, operator});
		});
		return {columns, tableName, clausesIndex};
	}

	validate(parsedStatement) {
		if (!(parsedStatement.tableName in this.tables)) throw `A tabela ${parsedStatement.tableName} não existe`;
	}

	filter(parsedStatement) {
		let rows = this.tables[parsedStatement.tableName].data;
		rows = rows.filter(row => {
			let ok = true;
			for(let column in row) {
				for (let clause of parsedStatement.clausesIndex) {
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

	process(parsedStatement) {
		let rows = this.filter(parsedStatement);
		let results = rows.map(row => {
			var result = {};
			for(let column of parsedStatement.columns) {
				column = column.trim();
				if (!(column in this.tables[parsedStatement.tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			return result;
		});
		return results;
	}
}