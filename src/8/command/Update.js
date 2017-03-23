import Command from "./Command"

export default class Insert extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/update (.*) set (.*)/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.split(",");
		return {tableName, columns};	
	}

	validate(parsedStatement) {
		if (!(parsedStatement.tableName in this.tables)) throw `A tabela ${parsedStatement.tableName} não existe`;
	}

	process(parsedStatement) {
		for(let row of this.tables[parsedStatement.tableName].data) {
			for(let column of parsedStatement.columns) {
				let parsedColumn = column.split("=");
				let [columnName, columnValue] = parsedColumn;
				columnName = columnName.trim();
				columnValue = columnValue.trim();
				if (!(columnName in this.tables[parsedStatement.tableName].columns)) throw `A coluna ${columnName} não existe`;
				row[columnName] = columnValue;
			}
		}
	}
}