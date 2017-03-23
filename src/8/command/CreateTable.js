import Command from "./Command"

export default class CreateTable extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		return {tableName, columns};
	}

	validate(parsedStatement) {
	}

	process(parsedStatement) {
		this.tables[parsedStatement.tableName] = {
			columns: {},
			data: []
		};
		for(let column of parsedStatement.columns) {
			let [name, type, ...options] = column.trim().split(" ");
			this.tables[parsedStatement.tableName].columns[name] = {type, options};
		}
	}
}