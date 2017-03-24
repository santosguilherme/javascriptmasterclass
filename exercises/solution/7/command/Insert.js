import Command from "./Command"

export default class Insert extends Command {

	parse(statement) {
		let parsedStatement = statement.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		return {tableName, columns, values};
	}

	validate(parsedStatement) {

	}

	process(parsedStatement) {
		let row = {};
		for(let i = 0; i < parsedStatement.columns.length; i++) {
			row[parsedStatement.columns[i].trim()] = parsedStatement.values[i].trim();
		}
		this.tables[parsedStatement.tableName].data.push(row);
	}
}