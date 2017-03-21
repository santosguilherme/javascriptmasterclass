import Command from './Command';
import {tables} from './tables';

export default class Update extends Command {

	parse(query) {
		let parsedQuery = query.replace(/(update|set)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-zA-Z0-9 ,=]+)/g);
		let table = tokenizedQuery[0].replace(/[@ ]*/g, "");
		let columns = tokenizedQuery[1].replace(/[@]*/g, "").split(",");
		let change = {};
		for (let column of columns) {
			let parts = column.split(/\=/);
			change[parts[0].trim()] = parts[1].trim();
		}
		return {table, change};
	}

	validate(parsedQuery) {
		for(let column in parsedQuery.change) {
			if (column in tables[parsedQuery.table].model) continue;
			throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
		}
	}

	executeCommand (parsedQuery) {
		for(let column in parsedQuery.change) {
			tables[parsedQuery.table].data[column] = parsedQuery.change[column];
		}
	}
}