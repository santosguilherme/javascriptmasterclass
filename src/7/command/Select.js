import Command from "./Command"

export default class Select extends Command {

	parse(statement) {
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
		return {columns, tableName, clausesIndex};
	}

	validate(parsedStatement) {
		if (!(parsedStatement.tableName in this.tables)) throw `A tabela ${parsedStatement.tableName} não existe`;
	}

	process(parsedStatement) {
		let rows = this.tables[parsedStatement.tableName].data;
		rows = rows.filter(row => {
			let ok = true;
			for(let column in row) {
				if (column in parsedStatement.clausesIndex && row[column] != parsedStatement.clausesIndex[column]) {
					ok = false;
					break;
				}
			}
			return ok;
		});
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