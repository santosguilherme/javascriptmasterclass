let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number'
		},
		data: {
			name: "Douglas Crockford",
			age: 45
		}
	}
};

class Command {
	execute(query) {
		let parsedQuery = this.parse(query);
		this.validate(parsedQuery);
		return this.executeCommand(parsedQuery);
	}
}

class Select extends Command {

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

class Update extends Command {

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

let select = new Select();
console.log(select.execute("select name, age from author where age = 45"));

let update = new Update();
update.execute("update author set name = Linus Torvalds, age = 50");

console.log(select.execute("select name, age from author where age = 45"));