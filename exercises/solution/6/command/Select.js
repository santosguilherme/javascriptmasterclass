import Command from "./Command"

export default class Select extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/select (.*) from (.*)/);
		let [undefined, columns, tableName] = parsedStatement;
		columns = columns.split(",");
		return {columns, tableName};
	}

	validate(parsedStatement) {
		if (!(parsedStatement.tableName in this.tables)) throw `A tabela ${parsedStatement.tableName} não existe`;
	}

	process(parsedStatement) {
		var results = [];
		for(let row of this.tables[parsedStatement.tableName].data) {
			var result = {};
			for(let column of parsedStatement.columns) {
				column = column.trim();
				if (!(column in this.tables[parsedStatement.tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			results.push(result);
		}
		return results;
	}
}