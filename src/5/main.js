let tables = {
	author: {
		model: {
			name: 'string',
			age: 'number',
			city: 'string',
			state: 'string'
		},
		data: [{
			name: "Douglas Crockford",
			age: 62,
			city: "Frostbite Falls",
			state: "Minesotta",
			country: "United States"
		},
		{
			name: "Linus Torvalds",
			age: 47,
			city: "Helsinki",
			state: "Uusimaa",
			country: "Finland"
		}]
	}
};

class Command {
	constructor(tables) {
		this.tables = tables;
	}

	execute(query) {
		let parsedQuery = this.parse(query);
		this.validate(parsedQuery);
		return this.process(parsedQuery);
	}
}

class Select extends Command {

	parse(query) {
		let parsedQuery = query.replace(/(select|from)/g, "@");
		let tokenizedQuery = parsedQuery.match(/@([a-z0-9 ,=]+)/g);
		let columns = tokenizedQuery[0].replace(/[@ ]*/g, "").split(",");
		let table = tokenizedQuery[1].replace(/[@ ]*/g, "");
		return {columns, table};
	}

	validate(parsedQuery) {
		for(let column of parsedQuery.columns) {
			if (column in this.tables[parsedQuery.table].model) continue;
			throw `A coluna ${column} não existe na tabela ${parsedQuery.table}`
		}
	}

	process(parsedQuery) {
		var results = [];
		for(let row of this.tables[parsedQuery.table].data) {
			var result = {};
			for(let column of parsedQuery.columns) {
				Object.assign(result, {[column]: row[column]});
			}
			results.push(result);
		}
		return results;
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

	process (parsedQuery) {
		for(let row of this.tables[parsedQuery.table].data) {
			for(let column in parsedQuery.change) {
				row[column] = parsedQuery.change[column];
			}
		}
	}
}

let select = new Select(tables);
console.log(select.execute("select name, age from author"));

let update = new Update(tables);
update.execute("update author set name = Linus Torvalds, age = 50");

console.log(select.execute("select name, age from author"));