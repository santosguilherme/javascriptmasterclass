import Command from "./Command"

export default class Truncate extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/truncate table (.*)/);
		let [undefined, tableName] = parsedStatement;
		return {tableName};
	}

	validate(parsedStatement) {

	}

	process(parsedStatement) {
		this.tables[parsedStatement.tableName].data = [];
		for(let column in this.tables[parsedStatement.tableName].columns) {
			for(let option of this.tables[parsedStatement.tableName].columns[column].options) {
				if (option === "autoincrement") this.tables[parsedStatement.tableName].columns[column].sequence = 1;
			}
		}
	}
}