import Command from './Command';
import {tables} from './tables';

export default class Select extends Command {

	parse(query) {
		let parsedQuery = query.replace(/(select|from|where)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);
		let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
		let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
		let clausules = tokenizedQuery[2].replace(/[@ ]*/g, "");
		return {columns, table, clausules};
	}

	validate(parsedQuery) {
		for(let column of parsedQuery.columns) {
			if (column in tables[parsedQuery.table].model) continue;
			throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
		}
	}

	executeCommand(parsedQuery) {
		var result = {};
		for(let column of parsedQuery.columns) {
			Object.assign(result, {[column]: tables[parsedQuery.table].data[column]});
		}
		return result;
	}
}